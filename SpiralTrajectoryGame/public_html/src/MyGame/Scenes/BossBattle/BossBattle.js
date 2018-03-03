/*
 * File: BossBattle.js 
 * This is the logic for the boss battle scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, ResultsScreen
  GameObject, Hero, Arrow, TextureRenderable, RigidRectangle, Platform, Terrain,
  ArrowVector, Torch, Config */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function BossBattle() {
    this.mMainCamera = null;
    this.mPhysicsGameObjects = null;
    this.mNonPhysicsGameObjects = null;
    this.mHero = null;
    this.mBoss = null;
    this.mCollisions = [];
}
gEngine.Core.inheritPrototype(BossBattle, Scene);

BossBattle.prototype.loadScene = function () {
    for (var texture in Config.BossBattle.Textures) {
        gEngine.Textures.loadTexture(Config.BossBattle.Textures[texture]);
    }
};

BossBattle.prototype.unloadScene = function () {
    for (var texture in Config.BossBattle.Textures) {
        gEngine.Textures.unloadTexture(Config.BossBattle.Textures[texture]);
    }
    gEngine.Core.startScene(new ResultsScreen());
};

BossBattle.prototype.initialize = function () {
    this.mMainCamera = new Camera(
        Config.BossBattle.Cameras.MainCameraStartingPosition,
        Config.BossBattle.Cameras.MainCameraWorldWidth,
        Config.BossBattle.Cameras.MainCameraViewport
    );
    this.mMainCamera.setBackgroundColor(Config.BossBattle.Cameras.MainCameraBackgroundColor);
    this.mMainCamera.configInterpolation(
        Config.BossBattle.Cameras.MainCameraInterpStiffness,
        Config.BossBattle.Cameras.MainCameraInterpDuration
    );
    gEngine.DefaultResources.setGlobalAmbientIntensity(Config.Engine.Misc.GlobalAmbientIntensity);
    gEngine.DefaultResources.setGlobalAmbientColor(Config.Engine.Misc.GlobalAmbientColor);

    this.mPhysicsGameObjects = new GameObjectSet();
    this.mNonPhysicsGameObjects = new GameObjectSet();
    this.mHero = new Hero(
        Config.BossBattle.Textures.HeroSprite, 
        this.mPhysicsGameObjects, 
        this.mMainCamera
    );
    this.mPhysicsGameObjects.addToSet(this.mHero);

    this.mBoss = new Boss(
        Config.BossBattle.Textures.BossSprite,
        Config.BossBattle.Textures.BossProjectileSprite, 
        this.mPhysicsGameObjects,
        this.mHero);
    this.mPhysicsGameObjects.addToSet(this.mBoss);
    
    this.buildLevel();
};

BossBattle.prototype.draw = function () {
    gEngine.Core.clearCanvas(Config.Engine.Misc.CanvasClearColor);
    this.mMainCamera.setupViewProjection();
    this.mPhysicsGameObjects.draw(this.mMainCamera);
    this.mCollisions = [];
};

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

    this.updateMainCamera();
};

// Updates the main camera to follow the hero
BossBattle.prototype.updateMainCamera = function () {
    var xform = this.mHero.getXform();
    this.mMainCamera.panTo(xform.getXPos(), xform.getYPos());
    this.mMainCamera.update();
};