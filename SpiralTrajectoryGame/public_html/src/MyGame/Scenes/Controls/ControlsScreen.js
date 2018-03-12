/* 
 * ControlsScreen.js
 * A Scene for displaying Credits
 */

"use strict";

function ControlsScreen() {
    this.mMainCamera = null;
    this.mReturnButton = null;
};
gEngine.Core.inheritPrototype(ControlsScreen, Scene);

ControlsScreen.prototype.loadScene = function () {
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.loadTexture(Config.UI.Textures[texture]);
    }
    for (var texture in Config.ControlsScreen.Textures) {
        gEngine.Textures.loadTexture(Config.ControlsScreen.Textures[texture]);
    }
};

ControlsScreen.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
 /*   for(var texture in Config.UI.Textures) {
        gEngine.Textures.unloadTexture(Config.UI.Textures[texture]);
    }
    for (var texture in Config.ControlsScreen.Textures) {
        gEngine.Textures.unloadTexture(Config.ControlsScreen.Textures[texture]);
    }
   */ 
    gEngine.Core.startScene(new SplashScreen());
};
ControlsScreen.prototype.initialize = function () {
    this.mMainCamera = new Camera(
        Config.ControlsScreen.Camera.StartingPosition,
        Config.ControlsScreen.Camera.WorldWidth,  
        Config.ControlsScreen.Camera.Viewport         
    );
    this.mMainCamera.setBackgroundColor(Config.ControlsScreen.Camera.BackgroundColor);
    gEngine.DefaultResources.setGlobalAmbientIntensity(2.5);
    

    this._initializeBackground();
    this._initializeUI();
};

ControlsScreen.prototype._initializeBackground = function() {
    
};

ControlsScreen.prototype._initializeUI = function() {
    var configUI = Config.ControlsScreen.UI;
    this.mTitle = new UIText(configUI.Title.Text,
                             configUI.Title.Position,
                             configUI.Title.TextHeight,
                             UIText.eHAlignment.eCenter, 
                             UIText.eVAlignment.eBottom);
    this.mTitle.setColor(configUI.Title.Color);

    this.mReturnButton = new UIButton(Config.UI.Textures.UIButton, 
                                this.mMainCamera,
                                this._returnCallback,
                                this,
                                configUI.ReturnButton.Position,
                                configUI.ReturnButton.Size,
                                configUI.ReturnButton.Text,
                                configUI.ReturnButton.TextHeight);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mTitle);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mReturnButton);
};

ControlsScreen.prototype._returnCallback = function() {
    gEngine.GameLoop.stop();
};

ControlsScreen.prototype.update = function() {
    gEngine.LayerManager.updateAllLayers();
};

ControlsScreen.prototype.draw = function() {
    gEngine.Core.clearCanvas([0, 0, 0, 1]);
    this.mMainCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mMainCamera);
};