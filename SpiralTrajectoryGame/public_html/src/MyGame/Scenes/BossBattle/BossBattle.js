/*
 * File: BossBattle.js 
 * This is the logic for the boss battle scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, ResultsScreen
  GameObject, Hero, Arrow, TextureRenderable, RigidRectangle, Platform, Terrain,
  ArrowVector, Torch, Config, Golem, Boundary */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function BossBattle() {
    this.mMainCamera = null;
    this.mGlobalLightSet = null;
    this.mBgShadow = null;
    this.mPhysicsGameObjects = null;
    this.mNonPhysicsGameObjects = null;
    this.mHero = null;
    this.mBoss = null;
    this.mBgL0 = null;
    this.mBgL1 = null;
    this.boundary = null;
    this.mFg = null;
    this.kBgMusic = null;
    this.mCollisions = [];
    this.mVictory = false;
    this.mLgtIndex = 0;
    this.mLgtRotateTheta = 0;
}
gEngine.Core.inheritPrototype(BossBattle, Scene);

BossBattle.prototype.loadScene = function () {
    for (var texture in Config.BossBattle.Textures) {
        gEngine.Textures.loadTexture(Config.BossBattle.Textures[texture]);
    }
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.loadTexture(Config.UI.Textures[texture]);
    }
    gEngine.AudioClips.loadAudio("assets/audio/music/bossbattle.mp3");
    gEngine.AudioClips.loadAudio("assets/audio/sfx/shoot.mp3");

};

BossBattle.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    this._unloadUI();
    for (var texture in Config.BossBattle.Textures) {
        gEngine.Textures.unloadTexture(Config.BossBattle.Textures[texture]);
    }
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.unloadTexture(Config.UI.Textures[texture]);
    }
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio("assets/audio/sfx/shoot.mp3");
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

    this.mNonPhysicsGameObjects = new GameObjectSet();
    this.mHero = new Hero(
        Config.BossBattle.Textures.HeroSprite,
        Config.BossBattle.Textures.HeroNormal,
        this.mMainCamera
    );
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors,this.mHero);
    gEngine.LayerManager.addAsShadowCaster(this.mHero);
    
    this.mBoss = new Golem(
        Config.BossBattle.Textures.BossSprite, 
        this.mHero, 
        this.mPhysicsGameObjects,
        this.mNonPhysicsGameObjects
    );

     gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mBoss);
    
    this.boundary = new Boundary(149,230,500,4);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.boundary);
    
    this.kBgMusic = "assets/audio/music/bossbattle.mp3";
    gEngine.AudioClips.playBackgroundAudio(this.kBgMusic, .08);
    
    this.buildLevel();
    
    
    this._initializeLights(); 
    this._initializeBackground()
    this._initializeUI();
    
    var actors = gEngine.LayerManager.getLayer(gEngine.eLayer.eActors);
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < actors.size(); j++) {
            if (actors.getObjectAt(j).getRenderable() instanceof LightRenderable){
                actors.getObjectAt(j).getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
            }
        }
    }
    
    this._setupShadow();
};

BossBattle.prototype._initializeBackground = function() {
    var farBG = new LightRenderable(Config.BossBattle.Textures.FarBackgroundTexture);
    farBG.setElementPixelPositions(0, 1024, 0, 512);
    farBG.getXform().setSize(400, 200);
    farBG.getXform().setPosition(0, 0);
    farBG.getXform().setZPos(-10);
    // Need a light
    farBG.addLight(this.mGlobalLightSet.getLightAt(0));   // only the directional light
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
  
    this.mBgL1 = new ParallaxGameObject(midBG , 1, this.mMainCamera);
    this.mBgL1.setCurrentFrontDir([0, -1, 0]);
    this.mBgL1.setIsTiled(false);
    
     for (var i = 0; i < 4; i++) {

        this.mBgL1.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
        
    }
    

    // add to layer managers ...
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBgL0);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eShadowReceiver, this.mBgL1);

};

BossBattle.prototype.draw = function () {
    gEngine.Core.clearCanvas(Config.Engine.Misc.CanvasClearColor);
    this.mMainCamera.setupViewProjection();
    gEngine.LayerManager.drawLayer(gEngine.eLayer.eBackground,this.mMainCamera);
    gEngine.LayerManager.drawLayer(gEngine.eLayer.eShadowReceiver,this.mMainCamera);
    this.mNonPhysicsGameObjects.draw(this.mMainCamera);
    //this.mPhysicsGameObjects.draw(this.mMainCamera);
        gEngine.LayerManager.drawLayer(gEngine.eLayer.eActors,this.mMainCamera);
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
    gEngine.LayerManager.updateAllLayers();
    gEngine.Physics.processCollision(
        gEngine.LayerManager.getLayer(gEngine.eLayer.eActors), 
        this.mCollisions
    );
    

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