/*
 * File: ResultsScreen.js 
 * This is the logic for the boss battle results scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, BossBattle, SplashScreen
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function ResultsScreen() {
    this.kNextSceneName = "SplashScreen";
    this.mMainCamera = null;    
}
gEngine.Core.inheritPrototype(ResultsScreen, Scene);

ResultsScreen.prototype.loadScene = function () {
            
};

ResultsScreen.prototype.unloadScene = function () {
    
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
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mMainCamera.setBackgroundColor([0, 0, 1, 1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
ResultsScreen.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0, 1, 1]);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
ResultsScreen.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        this.kNextSceneName = "BossBattle";
        gEngine.GameLoop.stop();
    } else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        this.kNextSceneName = "SplashScreen";
        gEngine.GameLoop.stop();
    }
};