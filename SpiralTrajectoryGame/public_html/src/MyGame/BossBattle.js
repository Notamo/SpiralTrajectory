/*
 * File: BossBattle.js 
 * This is the logic for the boss battle scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, ResultsScreen
  GameObject, Hero, Arrow, TextureRenderable, RigidRectangle, Platform, Terrain,
  ArrowVector */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function BossBattle() {
    // Constants/changeable values for different game features
    // Main Camera options
    this.cMainCameraStartingPosition = vec2.fromValues(0, 0);
    this.cMainCameraWorldWidth = 200;
    this.cMainCameraViewport = [0, 0, 1200, 900];
    this.cMainCameraBackgroundColor = [0.8, 0.8, 0.8, 1];
    this.cMainCameraInterpolationStiffness = 0.2;
    this.cMainCameraInterpolationDuration = 30;
    
    // ArrowVector
    this.cArrowVectorMaxLength = 30;
    
    // Color to clear the canvas to
    this.cCanvasClearColor = [0.8, 0.8, 0.8, 1];
    
    // Sprites & textures
    this.kHeroSprite = "assets/characters/hero.png";
    this.arrow="assets/projectiles/arrow.png";
    
    //Boss sprite sheet
    this.kBossSprite = "assets/characters/boss_sprites.png";
    
    this.kPlatformTexture = "assets/platform.png";
    this.kGroundTexture = "";
    this.kWallTexture = "";
    
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
    this.mArrowVector = null;
    
    // Object to track collisions? dunno if this is where we'll put it, temp for now
    this.mCollisions = [];
}
gEngine.Core.inheritPrototype(BossBattle, Scene);

BossBattle.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kBossSprite);
    gEngine.Textures.loadTexture(this.arrow);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
};

BossBattle.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kBossSprite);
    gEngine.Textures.unloadTexture(this.arrow);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
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
    
    // Two game object sets, one for objects with physics enabled, one for
    // non-physics objects.
    this.mPhysicsGameObjects = new GameObjectSet();
    this.mNonPhysicsGameObjects = new GameObjectSet();
    
    // Create the hero.
    this.mHero = new Hero(this.kHeroSprite);
    this.mPhysicsGameObjects.addToSet(this.mHero);
    
    // ArrowVector is our "firing" mechanism, need a single instance.
    this.mArrowVector = new ArrowVector(
        this.cArrowVectorMaxLength, 
        this.mMainCamera
    );
     
    //Create the boss
    this.mBoss = new Boss(this.kBossSprite, this.mHero);
    this.mPhysicsGameObjects.addToSet(this.mBoss);
    
    // Create platforms
    this.createPlatforms();
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
BossBattle.prototype.draw = function () {
    gEngine.Core.clearCanvas(this.cCanvasClearColor);
    this.mMainCamera.setupViewProjection();
    this.mPhysicsGameObjects.draw(this.mMainCamera);
    this.mArrowVector.draw(this.mMainCamera);
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
    this.mArrowVector.update();
    if (gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)) {
        this.mArrow = new Arrow(
            this.mHero.getXform().getPosition(),
            this.mArrowVector.getPower(),
            this.mArrowVector.getDegrees()
        );
        if(this.mArrow !== null) {
            this.mPhysicsGameObjects.addToSet(this.mArrow);
        }
    }
    
    // Firing modes, should be moved to the Hero class as well.
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
        this.mArrowVector.setFireMode(ArrowVector.eFiringModes.eTailControl);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
        this.mArrowVector.setFireMode(ArrowVector.eFiringModes.eHeadControl);
    }
    
    this.updateMainCamera();
};

// Updates the main camera to follow the hero
BossBattle.prototype.updateMainCamera = function () {
    var xform = this.mHero.getXform();
    this.mMainCamera.panTo(xform.getXPos(), xform.getYPos());
    this.mMainCamera.update();
};

// Initializes some platforms for the boss fight
BossBattle.prototype.createPlatforms = function () {
    this.mPhysicsGameObjects.addToSet(new Platform(
        this.kPlatformTexture,
        -20, -50,
        10, 10 / 8
    ));
    
    this.mPhysicsGameObjects.addToSet(new Platform(
        this.kPlatformTexture,
        0, 0,
        10, 10 / 8
    ));
    
    var i;
    var numBaseTerrain = 5;
    for(i = 0; i < numBaseTerrain; i++) {
        this.mPhysicsGameObjects.addToSet(new Terrain(
            this.kPlatformTexture,
            100 * i, -50,
            100, 100 / 8
        ));
    }
};