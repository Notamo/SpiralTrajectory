/*
 * File: SplashScreen.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, BossBattle
  GameObject, Config */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SplashScreen() {
    //background
    this.mFarBG = null;
    this.mMidBG = null;
    
    //arrow stuff
    this.mArrowTimer = 0;
    
    //UI stuff
    this.mTitle = null;
    this.mPlayButton = null;
    this.mCreditsButton = null;
    
    // The camera to view the scene
    this.mMainCamera = null;
    //if we're exiting to credits or the fight
    this.mToCredits = false;
}
gEngine.Core.inheritPrototype(SplashScreen, Scene);

SplashScreen.prototype.loadScene = function () {
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.loadTexture(Config.UI.Textures[texture]);
    }
    for (var texture in Config.SplashScreen.Textures) {
        gEngine.Textures.loadTexture(Config.SplashScreen.Textures[texture]);
    }

};

SplashScreen.prototype.unloadScene = function () {
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.unloadTexture(Config.UI.Textures[texture]);
    }
    for (var texture in Config.SplashScreen.Textures) {
        gEngine.Textures.unloadTexture(Config.SplashScreen.Textures[texture]);
    }
    
    gEngine.Core.startScene(new BossBattle());
};

SplashScreen.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mMainCamera = new Camera(
        Config.SplashScreen.Camera.StartingPosition, // position of the camera
        Config.SplashScreen.Camera.WorldWidth,                     // width of camera
        Config.SplashScreen.Camera.Viewport         // viewport (orgX, orgY, width, height)
    );
    this.mMainCamera.setBackgroundColor([0, 0, 0, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(2.5);
    

    this.spawnArrow();
    this._initializeBackground();
    this._initializeUI();
};

SplashScreen.prototype._initializeUI = function() {
    var configUI = Config.SplashScreen.UI;
    this.mTitle = new UIText(configUI.Title.Text,
                             configUI.Title.Position,
                             configUI.Title.TextHeight,
                             UIText.eHAlignment.eCenter, 
                             UIText.eVAlignment.eBottom);
    this.mTitle.setColor(configUI.Title.Color);
    
    this.mPlayButton = new UIButton(Config.UI.Textures.UIButton, 
                                    this.mMainCamera,
                                    this._testButtonCallback,
                                    configUI.PlayButton.Position,
                                    configUI.PlayButton.Size,
                                    configUI.PlayButton.Text,
                                    configUI.PlayButton.TextHeight);
    
    this.mCreditsButton = new UIButton(Config.UI.Textures.UIButton, 
                                this.mMainCamera,
                                this._creditsButtonCallback(),
                                configUI.CreditsButton.Position,
                                configUI.CreditsButton.Size,
                                configUI.CreditsButton.Text,
                                configUI.CreditsButton.TextHeight);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mTitle);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mPlayButton);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mCreditsButton);
};

SplashScreen.prototype._testButtonCallback = function() {
    gEngine.GameLoop.stop();
};

SplashScreen.prototype._creditsButtonCallback = function() {
    this.mToCredits = true;
    gEngine.GameLoop.stop();
};

SplashScreen.prototype._initializeBackground = function() {
    var farBG = new SpriteRenderable(Config.SplashScreen.Textures.FarBackgroundTexture);
    farBG.setElementPixelPositions(0, 1024, 0, 512);
    farBG.getXform().setSize(400, 200);
    farBG.getXform().setPosition(0, 0);
    farBG.getXform().setZPos(-10);
    this.mFarBG = new GameObject(farBG);

    var midBG = new SpriteRenderable(Config.SplashScreen.Textures.MidBackgroundTexture);
    midBG.setElementPixelPositions(0, 1024, 0, 512);
    midBG.getXform().setSize(352, 176);
    midBG.getXform().setPosition(0, 0);
    midBG.getXform().setZPos(-10);
    this.mMidBG = new GameObject(midBG);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mMidBG);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mFarBG);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SplashScreen.prototype.draw = function () {
    gEngine.Core.clearCanvas([0, 0, 0, 1]);
    this.mMainCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mMainCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
SplashScreen.prototype.update = function () {
    gEngine.LayerManager.updateAllLayers();
    
    this.mArrowTimer++;
    if(this.mArrowTimer >= Config.SplashScreen.ArrowTimerLength) {
        this.spawnArrow();
        this.mArrowTimer = 0;
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        gEngine.GameLoop.stop();
    }
};

SplashScreen.prototype.spawnArrow = function() {
    var pos = [0,0];
    pos[0] = pos[0] - 80;
    pos[1] = pos[1] - 10;
    var newArrow = new Arrow(pos,1.1,50);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, newArrow);
};
