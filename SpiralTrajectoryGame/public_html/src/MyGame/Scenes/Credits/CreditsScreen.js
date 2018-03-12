/* 
 * CreditsScreen.js
 * A Scene for displaying Credits
 */

"use strict";

function CreditsScreen() {
    this.mMainCamera = null;
    this.mReturnButton = null;
};
gEngine.Core.inheritPrototype(CreditsScreen, Scene);

CreditsScreen.prototype.loadScene = function () {
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.loadTexture(Config.UI.Textures[texture]);
    }
    for (var texture in Config.CreditsScreen.Textures) {
        gEngine.Textures.loadTexture(Config.CreditsScreen.Textures[texture]);
    }
};

CreditsScreen.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
 /*   for(var texture in Config.UI.Textures) {
        gEngine.Textures.unloadTexture(Config.UI.Textures[texture]);
    }
    for (var texture in Config.CreditsScreen.Textures) {
        gEngine.Textures.unloadTexture(Config.CreditsScreen.Textures[texture]);
    }
   */ 
    gEngine.Core.startScene(new SplashScreen());
};
CreditsScreen.prototype.initialize = function () {
    this.mMainCamera = new Camera(
        Config.CreditsScreen.Camera.StartingPosition,
        Config.CreditsScreen.Camera.WorldWidth,  
        Config.CreditsScreen.Camera.Viewport         
    );
    this.mMainCamera.setBackgroundColor(Config.CreditsScreen.Camera.BackgroundColor);
    gEngine.DefaultResources.setGlobalAmbientIntensity(2.5);
    

    this._initializeBackground();
    this._initializeUI();
};

CreditsScreen.prototype._initializeBackground = function() {
    
};

CreditsScreen.prototype._initializeUI = function() {
    var configUI = Config.CreditsScreen.UI;
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
    
    this._makeTextSet(configUI.CreditsTextSet);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mTitle);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mReturnButton);
};

CreditsScreen.prototype._makeTextSet = function(textSetData){
    var curPos = vec2.clone(textSetData.StartPos);
    
    for(var string in textSetData.Set) {
        var newText = new UIText(textSetData.Set[string],
                             curPos,
                             textSetData.TextHeight,
                             UIText.eHAlignment.eCenter,
                             null);
        newText.setColor(textSetData.Color);
        
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, newText);
        curPos[1] -= (textSetData.TextHeight + textSetData.Spacing);
    }
};

CreditsScreen.prototype._returnCallback = function() {
    gEngine.GameLoop.stop();
};

CreditsScreen.prototype.update = function() {
    console.log("update");
    gEngine.LayerManager.updateAllLayers();
};

CreditsScreen.prototype.draw = function() {
    gEngine.Core.clearCanvas([0, 0, 0, 1]);
    this.mMainCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mMainCamera);
};