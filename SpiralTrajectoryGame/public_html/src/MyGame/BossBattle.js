/*
 * File: BossBattle.js 
 * This is the logic for the boss battle scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, ResultsScreen
  GameObject, Hero, TextureRenderable, RigidRectangle, Platform */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function BossBattle() {
    // Sprites & textures
    this.kHeroSprite = "assets/characters/hero.png";
    this.kBossSprite = "";
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
    
    // UI objects
    this.mArrowVector = null;
    
    // Object to track collisions? dunno if this is where we'll put it, temp for now
    this.mCollisions = [];
}
gEngine.Core.inheritPrototype(BossBattle, Scene);

BossBattle.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
};

BossBattle.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Core.startScene(new ResultsScreen());
};

BossBattle.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mMainCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                     // width of camera
        [0, 0, 1200, 900]         // viewport (orgX, orgY, width, height)
    );
    this.mMainCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // We'll need to determine what interpolation values we want for the camera
    // that tracks the hero.
    this.mMainCamera.configInterpolation(0.2, 30);
    
    // Two game object sets, one for objects with physics enabled, one for
    // non-physics objects.
    this.mPhysicsGameObjects = new GameObjectSet();
    this.mNonPhysicsGameObjects = new GameObjectSet();
    
    // Create the hero
    this.mHero = new Hero(this.kHeroSprite);
    this.mPhysicsGameObjects.addToSet(this.mHero);
    
     this.mArrowVector = new ArrowVector(30, this.mMainCamera);
    
    // Create platforms
    this.createPlatforms();
    
    //gEngine.Physics.togglePositionalCorrection();
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
BossBattle.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1]);
    
    this.mMainCamera.setupViewProjection();
    
    this.mPhysicsGameObjects.draw(this.mMainCamera);
    this.mArrowVector.draw(this.mMainCamera);
    this.mCollisions = [];
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
BossBattle.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        gEngine.GameLoop.stop();
    }
    
    this.mPhysicsGameObjects.update();
    gEngine.Physics.processCollision(this.mPhysicsGameObjects, this.mCollisions);
    this.mArrowVector.update();
    this.updateMainCamera();
};

// Updates the main camera to point to follow the hero
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
    
    this.mPhysicsGameObjects.addToSet(new Platform(
        this.kPlatformTexture,
        0, -50,
        100, 100 / 8
    ));
};
