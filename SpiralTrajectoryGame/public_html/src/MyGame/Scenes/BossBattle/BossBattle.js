/*
 * File: BossBattle.js 
 * This is the logic for the boss battle scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, ResultsScreen
  GameObject, Hero, Arrow, TextureRenderable, RigidRectangle, Platform, Terrain,
  ArrowVector, Torch, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function BossBattle() {
    this.mMainCamera = null;
    this.mPhysicsGameObjects = null;
    this.mNonPhysicsGameObjects = null;
    this.mHero = null;
    this.mBoss = null;
    this.mBgL0 = null;
    this.mBgL1 = null;
    this.mFg = null;
    this.mCollisions = [];
    this.mVictory = false;
}
gEngine.Core.inheritPrototype(BossBattle, Scene);

BossBattle.prototype.loadScene = function () {
    for (var texture in Config.BossBattle.Textures) {
        gEngine.Textures.loadTexture(Config.BossBattle.Textures[texture]);
    }
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.loadTexture(Config.UI.Textures[texture]);
    }
};

BossBattle.prototype.unloadScene = function () {
    this._unloadUI();
    for (var texture in Config.BossBattle.Textures) {
        gEngine.Textures.unloadTexture(Config.BossBattle.Textures[texture]);
    }
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.unloadTexture(Config.UI.Textures[texture]);
    }
    gEngine.Core.startScene(new ResultsScreen(this.mVictory));
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
    
    this.mBoss = new Golem(
        Config.BossBattle.Textures.BossSprite, 
        this.mHero, 
        this.mPhysicsGameObjects,
        this.mNonPhysicsGameObjects
    );

    this.mPhysicsGameObjects.addToSet(this.mBoss);
    
    this.buildLevel();
    
    this.initializeBackground();
    
    this.wall = new TiledGameObject(new TextureRenderable(Config.BossBattle.Textures.TileBackgroundTexture));
    this.wall.getXform().setSize(Config.BossBattle.Background[0].Width, Config.BossBattle.Background[0].Height);

    this._initializeUI();
};

BossBattle.prototype.initializeBackground = function() {
    var farBG = new IllumRenderable(Config.BossBattle.Textures.FarBackgroundTexture, Config.BossBattle.Textures.FarBackgroundNormal);
    farBG.setElementPixelPositions(0, 1024, 0, 512);
    farBG.getXform().setSize(400, 200);
    farBG.getXform().setPosition(0, 0);
    farBG.getMaterial().setSpecular([0.2, 0.1, 0.1, 1]);
    farBG.getMaterial().setShininess(50);
    farBG.getXform().setZPos(-10);
    // Need a light
    //farBG.addLight();   // only the directional light
    this.mBgL0 = new ParallaxGameObject(farBG, 5, this.mMainCamera);
    this.mBgL0.setCurrentFrontDir([-1, 0, 0]);
    this.mBgL0.setSpeed(.01);
    
    var midBG = new IllumRenderable(Config.BossBattle.Textures.MidBackgroundTexture, Config.BossBattle.Textures.MidBackgroundNormal);
    midBG.setElementPixelPositions(0, 1024, 0, 512);
    midBG.getXform().setSize(348, 174);
    midBG.getXform().setPosition(148, 81);
    midBG.getMaterial().setSpecular([0.2, 0.1, 0.1, 1]);
    midBG.getMaterial().setShininess(50);
    midBG.getXform().setZPos(-1);
    // Need lights
    //farBG.addLight();   
    this.mBgL1 = new ParallaxGameObject(midBG , 1.01, this.mMainCamera);
    this.mBgL1.setCurrentFrontDir([0, -1, 0]);
    this.mBgL1.setIsTiled(false);
    
   /* var FG = new IllumRenderable(Config.BossBattle.Textures.ForegroundTexture, Config.BossBattle.Textures.ForegroundNormal);
    FG.setElementPixelPositions(0, 1024, 0, 512);
    FG.getXform().setSize(354, 178);
    FG.getXform().setPosition(148, 81);
    FG.getMaterial().setSpecular([0.2, 0.1, 0.1, 1]);
    FG.getMaterial().setShininess(50);
    FG.getXform().setZPos(2);
    // Need lights
    //farBG.addLight();   
    this.mFg = new ParallaxGameObject(FG , 1, this.mMainCamera);
    this.mFg.setCurrentFrontDir([-1, 0, 0]);
    this.mFg.setIsTiled(false);
    
    */
    // add to layer managers ...
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBgL0);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eShadowReceiver, this.mBgL1);
  //  gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mFg);
};

BossBattle.prototype.draw = function () {
    gEngine.Core.clearCanvas(Config.Engine.Misc.CanvasClearColor);
    this.mMainCamera.setupViewProjection();
    gEngine.LayerManager.drawLayer(gEngine.eLayer.eBackground,this.mMainCamera);
    gEngine.LayerManager.drawLayer(gEngine.eLayer.eShadowReceiver,this.mMainCamera);
    //this.wall.draw(this.mMainCamera);
    this.mNonPhysicsGameObjects.draw(this.mMainCamera);
    this.mPhysicsGameObjects.draw(this.mMainCamera);
    
   // gEngine.LayerManager.drawLayer(gEngine.eLayer.eFront,this.mMainCamera);
    //gEngine.LayerManager.drawLayer(gEngine.eLayer.eHUD,this.mMainCamera);
    this.mCollisions = [];
    
    gEngine.LayerManager.drawLayer(gEngine.eLayer.eHUD, this.mMainCamera);
};

BossBattle.prototype.update = function () {
    // This is our toggle to switch scenes, temporary binding to the R key, but
    // will need to be changed for the final game.
    //if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
    //    gEngine.GameLoop.stop();
   // }

    this.mNonPhysicsGameObjects.update();
    this.mPhysicsGameObjects.update();
    gEngine.Physics.processCollision(
        this.mPhysicsGameObjects, 
        this.mCollisions
    );
    
    gEngine.LayerManager.updateAllLayers();

    this.updateMainCamera();
    this._updateUI();
    if (this.mHero.getStatus() === false) {
        this.mVictory = false;
        gEngine.GameLoop.stop();
    } else if (this.mBoss.getCurrentState() === Config.Golem.States.Dead) {
        this.mVictory = true;
        gEngine.GameLoop.stop();
    }
};

// Updates the main camera to follow the hero
BossBattle.prototype.updateMainCamera = function () {
    var xform = this.mHero.getXform();
    this.mMainCamera.panTo(xform.getXPos(), xform.getYPos());
    this.mMainCamera.update();
};
