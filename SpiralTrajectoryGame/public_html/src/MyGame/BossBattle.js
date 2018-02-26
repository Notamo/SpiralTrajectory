/*
 * File: BossBattle.js 
 * This is the logic for the boss battle scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, ResultsScreen
  GameObject, Hero, Arrow, TextureRenderable, RigidRectangle, Platform, Terrain */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function BossBattle() {
    // Sprites & textures
    this.kHeroSprite = "assets/characters/hero.png";
    this.arrow="assets/projectiles/arrow.png";
    
    //Boss sprites (perhaps these could be combined into one sheet?
    this.kBossSprite = "assets/characters/boss_sprites.png";
    this.kBossIdleSprite = "assets/characters/boss_idle.png";
    this.kBossAttackSprite = "assets/characters/boss_attack.png";
    
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
    gEngine.Textures.loadTexture(this.kBossIdleSprite);
    gEngine.Textures.loadTexture(this.kBossAttackSprite);
    gEngine.Textures.loadTexture(this.arrow);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
};

BossBattle.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kBossSprite);
    gEngine.Textures.unloadTexture(this.kBossIdleSprite);
    gEngine.Textures.unloadTexture(this.kBossAttackSprite);
    gEngine.Textures.unloadTexture(this.arrow);
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
     
    //Create the boss
    this.mBoss = new Boss(this.kBossSprite, this.mHero);
    this.mPhysicsGameObjects.addToSet(this.mBoss);
    
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
    if(this.mArrow!==null){
    this.mArrow.draw(this.mMainCamera);}
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
    if (gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)) 
    {
        this.mArrow = new Arrow(this.mHero.getXform().getPosition(), this.mArrowVector.getPower(),this.mArrowVector.getDegrees());
    }
    if(this.mArrow!==null){
    this.mArrow.update();}
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