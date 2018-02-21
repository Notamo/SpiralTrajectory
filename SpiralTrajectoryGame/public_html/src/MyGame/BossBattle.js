/*
 * File: BossBattle.js 
 * This is the logic for the boss battle scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, ResultsScreen
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function BossBattle() {
    this.mMainCamera = null;
}
gEngine.Core.inheritPrototype(BossBattle, Scene);


BossBattle.prototype.loadScene = function () {
            
};

BossBattle.prototype.unloadScene = function () {
    gEngine.Core.startScene(new ResultsScreen());
};

BossBattle.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mMainCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mMainCamera.setBackgroundColor([1, 0, 0, 1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
BossBattle.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 0, 0, 1]);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
BossBattle.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        gEngine.GameLoop.stop();
    }
};