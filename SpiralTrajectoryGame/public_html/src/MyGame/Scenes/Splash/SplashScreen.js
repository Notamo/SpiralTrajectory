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
    this.arrow = "assets/projectiles/arrow.png";
    this.title = null;
    this.msg = null;
    this.mArrow = null;

    this.mFarBG = null;
    this.mMidBG = null;
    
    // The camera to view the scene
    this.mMainCamera = null;
    this.mBg = null;
}
gEngine.Core.inheritPrototype(SplashScreen, Scene);

SplashScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.arrow);
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.loadTexture(Config.UI.Textures[texture]);
    }
    for (var texture in Config.SplashScreen.Textures) {
        gEngine.Textures.loadTexture(Config.SplashScreen.Textures[texture]);
    }

};

SplashScreen.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.arrow);
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
    
    var pos=[50,40];
    pos[0]=pos[0]-80;
    pos[1]=pos[1]-10;
    this.mArrow=new Arrow(pos,1,50);
    

    this._initializeUI();
    this._initializeBackground();
};

SplashScreen.prototype._initializeUI = function() {
    
    this.title = new UIText("Golem Smash", vec2.fromValues(450, 800), 10);
    this.title.setColor([1, .84, 0, 1]);
    
    this.msg = new UIText("Press B to Play", vec2.fromValues(450, 100), 5);
    this.msg.setColor([1, 1, 1, 1]);
};

SplashScreen.prototype._initializeBackground = function() {
    this.mFarBG = new SpriteRenderable(Config.SplashScreen.Textures.FarBackgroundTexture);
    this.mFarBG.setElementPixelPositions(0, 1024, 0, 512);
    this.mFarBG.getXform().setSize(400, 200);
    this.mFarBG.getXform().setPosition(0, 0);
    this.mFarBG.getXform().setZPos(-10);
    
    this.mMidBG = new SpriteRenderable(Config.SplashScreen.Textures.MidBackgroundTexture);
    this.mMidBG.setElementPixelPositions(0, 1024, 0, 512);
    this.mMidBG.getXform().setSize(352, 176);
    this.mMidBG.getXform().setPosition(0, 0);
    this.mMidBG.getXform().setZPos(-10); 
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SplashScreen.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0, 0, 1]);
    this.mMainCamera.setupViewProjection();
    
    //gEngine.LayerManager.drawAllLayers(this.mMainCamera);
    this.mFarBG.draw(this.mMainCamera);
    this.mMidBG.draw(this.mMainCamera);
    
    //Arrow
    this.mArrow.draw(this.mMainCamera);
    
    //UI
    this.title.draw(this.mMainCamera);
    this.msg.draw(this.mMainCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
SplashScreen.prototype.update = function () {
    //gEngine.GameLoop.stop();
    this.mArrow.update();
    //Updated the alpha of the font renderables
    var tColor = this.title.getColor();
    var tColor = [tColor[0],tColor[1],tColor[2],tColor[3]+1/60];
    //var mColor = this.msg.getColor();
    //var mColor = [mColor[0],mColor[1],mColor[2],mColor[3]+1/60];
    //sets new alpha of main title
    /*if(this.mArrow.getXform().getPosition()[0]>120)
    {
        this.title.setColor(tColor);
    }*/
    //reveals 2nd font renderable
    /*if(tColor[3]>=3)
    {
        this.msg.setColor(mColor);
    }*/
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        gEngine.GameLoop.stop();
    }
};
