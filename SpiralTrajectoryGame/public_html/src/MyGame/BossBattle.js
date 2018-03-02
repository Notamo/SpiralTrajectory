/*
 * File: BossBattle.js 
 * This is the logic for the boss battle scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, ResultsScreen
  GameObject, Hero, Arrow, TextureRenderable, RigidRectangle, Platform, Terrain,
  ArrowVector, Torch */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function BossBattle() {
    // Constants/changeable values for different game features
    // Main Camera options
    this.cMainCameraStartingPosition = vec2.fromValues(25, 1);
    this.cMainCameraWorldWidth = 200;
    this.cMainCameraViewport = [0, 0, 1200, 900];
    this.cMainCameraBackgroundColor = [0.8, 0.8, 0.8, 1];
    this.cMainCameraInterpolationStiffness = 0.2;
    this.cMainCameraInterpolationDuration = 30;
    
    // Color to clear the canvas to
    this.cCanvasClearColor = [0.8, 0.8, 0.8, 1];
    
    // Sprites & textures
    this.kHeroSprite = "assets/characters/hero.png";
    this.kArrow="assets/projectiles/arrow.png";
    this.kIceArrow="assets/projectiles/icearrow.png";
    this.kFireArrow="assets/projectiles/firearrow.png";
    
    //Boss sprite sheet
    this.kBossSprite = "assets/characters/boss_sprites.png";
    
    this.kPlatformTexture = "assets/props/platform.png";
    this.kGroundTexture = "assets/props/platform.png";
    this.kWallTexture = "assets/wall.png";
    this.kTorchTexture = "assets/props/torch1.png";
    this.kTorchParticleTexture = "assets/particle.png";
    
    // Cameras
    this.mMainCamera = null;
    this.mMinimapCamera = null;
    
    // Game object sets
    this.mPhysicsGameObjects = null;
    this.mNonPhysicsGameObjects = null;
    
    // Individual game objects
    this.mHero = null;
    this.mArrow = null;
    this.mBoss = null;
    
    // UI objects
    
    // Object to track collisions? dunno if this is where we'll put it, temp for now
    this.mCollisions = [];
}
gEngine.Core.inheritPrototype(BossBattle, Scene);

BossBattle.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kBossSprite);
    gEngine.Textures.loadTexture(this.kArrow);
    gEngine.Textures.loadTexture(this.kIceArrow);
    gEngine.Textures.loadTexture(this.kFireArrow);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kGroundTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kTorchTexture);
    gEngine.Textures.loadTexture(this.kTorchParticleTexture);
};

BossBattle.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kBossSprite);
    gEngine.Textures.unloadTexture(this.kArrow);
    gEngine.Textures.unloadTexture(this.kIceArrow);
    gEngine.Textures.unloadTexture(this.kFireArrow);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kGroundTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kTorchTexture);
    gEngine.Textures.unloadTexture(this.kTorchParticleTexture);
    gEngine.Core.startScene(new ResultsScreen());
};

BossBattle.prototype.initialize = function () {
    // Setup the main camera.
    this.mMainCamera = new Camera(
        this.cMainCameraStartingPosition,
        this.cMainCameraWorldWidth,
        this.cMainCameraViewport
    );
    this.mMainCamera.setBackgroundColor(this.cMainCameraBackgroundColor);
    this.mMainCamera.configInterpolation(
        this.cMainCameraInterpolationStiffness,
        this.cMainCameraInterpolationDuration
    );
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(2.5);
    gEngine.DefaultResources.setGlobalAmbientColor([.3,.325,.3,.4]);
    
    // Two game object sets, one for objects with physics enabled, one for
    // non-physics objects.
    this.mPhysicsGameObjects = new GameObjectSet();
    this.mNonPhysicsGameObjects = new GameObjectSet();

    // Create the hero.
    this.mHero = new Hero(this.kHeroSprite, this.mPhysicsGameObjects, this.mMainCamera);
    this.mPhysicsGameObjects.addToSet(this.mHero);
     
    //Create the boss
    this.mBoss = new Boss(this.kBossSprite, this.mHero);
    this.mPhysicsGameObjects.addToSet(this.mBoss);
    
    // Create platforms
    this.buildLevel();
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
BossBattle.prototype.draw = function () {
    gEngine.Core.clearCanvas(this.cCanvasClearColor);
    this.mMainCamera.setupViewProjection();
    this.mPhysicsGameObjects.draw(this.mMainCamera);
    this.mCollisions = [];
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
BossBattle.prototype.update = function () {
    // This is our toggle to switch scenes, temporary binding to the R key, but
    // will need to be changed for the final game.
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        gEngine.GameLoop.stop();
    }

    this.mPhysicsGameObjects.update();
    gEngine.Physics.processCollision(
        this.mPhysicsGameObjects, 
        this.mCollisions
    );
    
    // Handle creation of new arrows. This might need to be moved to the Hero class
    // at some point.
    
    this.updateMainCamera();
};

// Updates the main camera to follow the hero
BossBattle.prototype.updateMainCamera = function () {
    var xform = this.mHero.getXform();
    this.mMainCamera.panTo(xform.getXPos(), xform.getYPos());
    this.mMainCamera.update();
};

// Initializes some platforms for the boss fight
BossBattle.prototype.buildLevel = function () {
    // Create the boundary for the battle
    // Create the floor
    this.mPhysicsGameObjects.addToSet(new Terrain(
        this.kGroundTexture,
        150, -55,
        300, 150 
    ));
    
    // Create the roof  
    // do we want a roof?

    // Create the left wall 
    this.mPhysicsGameObjects.addToSet(new Terrain(
        this.kWallTexture,
        -100, 0,
        200, 1000
    ));

    // Create the right wall
    this.mPhysicsGameObjects.addToSet(new Terrain(
        this.kWallTexture,
        400, 0,
        200, 1000
    ));
    
    // Create the platforms
    this.mPhysicsGameObjects.addToSet(new Platform(
        this.kPlatformTexture,
        40, 30,
        20, 5
    ));
    
    this.mPhysicsGameObjects.addToSet(new Platform(
        this.kPlatformTexture,
        120, 30,
        20, 5
    ));
    
    this.mPhysicsGameObjects.addToSet(new Platform(
        this.kPlatformTexture,
        80, 60,
        20, 5
    ));
    
    this.mPhysicsGameObjects.addToSet(new Platform(
        this.kPlatformTexture,
        20, 80,
        20, 5
    ));
    
    this.mPhysicsGameObjects.addToSet(new Platform(
        this.kPlatformTexture,
        140, 80,
        20, 5
    ));
    
    // Torches
    this.mPhysicsGameObjects.addToSet(new Torch(
        this.kTorchTexture
    ));
};
