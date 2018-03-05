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
    this.kResultsScreenBackground = "";
    this.arrow = "assets/projectiles/arrow.png";
    this.title = null;
    this.msg = null;
    this.mArrow = null;
    this.mResult = result;

    // The camera to view the scene
    this.mMainCamera = null;
    this.mBg = null;
}
gEngine.Core.inheritPrototype(ResultsScreen, Scene);

ResultsScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.arrow);
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.loadTexture(Config.UI.Textures[texture]);
    }
};

ResultsScreen.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.arrow);
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.unloadTexture(Config.UI.Textures[texture]);
    } 
    var nextScene = null;
    if (this.kNextSceneName === "BossBattle") {
        nextScene = new BossBattle();
    } else {
        nextScene = new SplashScreen();
    }
    gEngine.Core.startScene(nextScene);
};

ResultsScreen.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mMainCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 1200, 900]         // viewport (orgX, orgY, width, height)
    );
    var pos=[50,40];
    pos[0]=pos[0]-80;
    pos[1]=pos[1]-10;
    gEngine.DefaultResources.setGlobalAmbientIntensity(2.5);
    //Creation of arrow and Both FontRenderables
    this.mArrow=new Arrow(pos,1,50);
    var tempMsg = this.mResult === true ? "You won!" : "You lost...";
    this.title=new FontRenderable(tempMsg);
    this.title.setColor([.5, .5, .5, 1]);
    //this.title.setColor([1, 1, 1, 0]);
    this.title.getXform().setPosition(33,40);
    this.title.setTextHeight(5);
    this.msg=new FontRenderable("Press B to play again, S for splash screen.");
    this.msg.setColor([.5, .5, .5, 1]);
    this.msg.getXform().setPosition(37,35);
    this.msg.setTextHeight(3);
    this.mMainCamera.setBackgroundColor([.5, .5, .5, 1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
ResultsScreen.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.5, 0.5, 0.5, 1]);
    this.mMainCamera.setupViewProjection();
    this.mArrow.draw(this.mMainCamera);
    this.title.draw(this.mMainCamera);
    this.msg.draw(this.mMainCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
ResultsScreen.prototype.update = function () {
    this.mArrow.update();
    //Updated the alpha of the font renderables
    var tColor = this.title.getColor();
    var tColor = [tColor[0],tColor[1],tColor[2],tColor[3]+1/60];
    var mColor = this.msg.getColor();
    var mColor = [mColor[0],mColor[1],mColor[2],mColor[3]+1/60];
    //sets new alpha of main title
    if(this.mArrow.getXform().getPosition()[0]>120)
    {
        this.title.setColor(tColor);
    }
    //reveals 2nd font renderable
    if(tColor[3]>=3)
    {
        this.msg.setColor(mColor);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        this.kNextSceneName = "BossBattle";
        gEngine.GameLoop.stop();
    } else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        this.kNextSceneName = "SplashScreen";
        gEngine.GameLoop.stop();
    }
};