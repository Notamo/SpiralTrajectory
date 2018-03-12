/*
 * File: ResultsScreen.js 
 * This is the logic for the boss battle results scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, BossBattle, SplashScreen
  GameObject, Config */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function ResultsScreen(result) {
    this.kNextSceneName = "SplashScreen";
    this.mResult = result;
    this.kMusicCue = null;
    
    //Background
    this.mBg = null;
    
    //Arrow
    this.mArrow = null;
    
    //UI
    this.mTitle = null;
    this.mReplayButton = null;
    this.mMenuButton = null;

    // The camera to view the scene
    this.mMainCamera = null;

}
gEngine.Core.inheritPrototype(ResultsScreen, Scene);

ResultsScreen.prototype.loadScene = function () {
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.loadTexture(Config.UI.Textures[texture]);
    }
    
    for(var texture in Config.ResultsScreen.Textures) {
        gEngine.Textures.loadTexture(Config.ResultsScreen.Textures[texture]);
    }
    
    for(var audio in Config.ResultsScreen.Audio) {
        gEngine.AudioClips.loadAudio(Config.ResultsScreen.Audio[audio]);
    }
};

ResultsScreen.prototype.unloadScene = function () {
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.unloadTexture(Config.UI.Textures[texture]);
    } 
    for(var texture in Config.ResultsScreen.Textures) {
        gEngine.Textures.unloadTexture(Config.ResultsScreen.Textures[texture]);
    }
    
    for(var audio in Config.ResultsScreen.Audio) {
        gEngine.AudioClips.unloadAudio(Config.ResultsScreen.Audio[audio]);
    }
    
    //Start the appropriate scene based on what the user clicked
    var nextScene = null;
    if (this.kNextSceneName === "BossBattle") {
        nextScene = new BossBattle();
    } else {
        nextScene = new SplashScreen();
    }
    gEngine.Core.startScene(nextScene);
};

ResultsScreen.prototype.initialize = function () {
    this.mMainCamera = new Camera(
        Config.SplashScreen.Camera.StartingPosition, // position of the camera
        Config.SplashScreen.Camera.WorldWidth,                     // width of camera
        Config.SplashScreen.Camera.Viewport         // viewport (orgX, orgY, width, height)
    );
    this.mMainCamera.setBackgroundColor(Config.SplashScreen.Camera.BackgroundColor);
    gEngine.DefaultResources.setGlobalAmbientIntensity(2.5);

    //initialize the UI
    this._initializeUI();
    
    //create the arrow
    this.spawnArrow();

    //play the corresponding audio cue
    if (this.mResult) {
        this.kMusicCue = Config.ResultsScreen.Audio.VictoryClip;
    } 
    else {
        this.kMusicCue = Config.ResultsScreen.Audio.GameOverClip;
    }
    gEngine.AudioClips.playACue(this.kMusicCue, 0.1);
};

ResultsScreen.prototype._initializeUI = function() {
    var configUI = Config.ResultsScreen.UI;
    
    var titleMsg = this.mResult === true ? "You won!" : "You lost...";
    this.mTitle = new UIText(titleMsg,
                             configUI.Title.Position,
                             configUI.Title.TextHeight,
                             UIText.eHAlignment.eCenter, 
                             UIText.eVAlignment.eBottom);
    this.mTitle.setColor(configUI.Title.Color);
    
    this.mReplayButton = new UIButton(Config.UI.Textures.UIButton, 
                                this.mMainCamera,
                                this._replayCallback,
                                configUI.ReplayButton.Position,
                                configUI.ReplayButton.Size,
                                configUI.ReplayButton.Text,
                                configUI.ReplayButton.TextHeight);
                                
    this.mMenuButton = new UIButton(Config.UI.Textures.UIButton, 
                                this.mMainCamera,
                                this._menuCallback,
                                configUI.MenuButton.Position,
                                configUI.MenuButton.Size,
                                configUI.MenuButton.Text,
                                configUI.MenuButton.TextHeight);
                                
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mTitle);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mReplayButton);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mMenuButton);
};

ResultsScreen.prototype._replayCallback = function() {
    this.kNextSceneName = "BossBattle";
    gEngine.GameLoop.stop();
};

ResultsScreen.prototype._menuCallback = function() {
    this.kNextSceneName = "SplashScreen";
    gEngine.GameLoop.stop();
};


// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
ResultsScreen.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.5, 0.5, 0.5, 1]);
    this.mMainCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mMainCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
ResultsScreen.prototype.update = function () {
    gEngine.LayerManager.updateAllLayers();
    
    //Updated the alpha of the Title
    var tColor = this.mTitle.getColor();
    var tColor = [tColor[0],tColor[1],tColor[2],tColor[3]+1/60];
    //sets new alpha of main title
    if(this.mArrow.getXform().getPosition()[0]>120){
        this.mTitle.setColor(tColor);
    }
};

ResultsScreen.prototype.spawnArrow = function() {
    var pos = [0,0];
    pos[0] = pos[0] - 80;
    pos[1] = pos[1] - 10;
    this.mArrow = new Arrow(pos,1.1,50);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mArrow);
};