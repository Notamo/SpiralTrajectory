/* 
 * Config_ResultsScreen.js
 * 
 * Config settings for the results screen
 */

"use strict";

var Config = Config || {};

Config.ResultsScreen = Object.freeze({
    Textures: {
        DefaultArrowSprite:     "assets/projectiles/arrow.png",
        FarBackgroundTexture:   "assets/background/backgroundfar.png",
        MidBackgroundTexture:   "assets/background/backgroundmid.png"
    },
    Audio: {
      VictoryClip: "assets/audio/music/victory.mp3",
      GameOverClip: "assets/audio/music/gameover.mp3"
    },
    Camera: {
        StartingPosition:     vec2.fromValues(25, 0),
        WorldWidth:           200,
        Viewport:             [0, 0, 1200, 900],
        BackgroundColor:      [0.8, 0.8, 0.8, 1],
        InterpStiffness:      0.2,
        InterpDuration:       30
    },
    UI: {
        Title: {
            Text: "[Victory Status]",
            Position: vec2.fromValues(600, 800),
            TextHeight: 10,
            Color: [.5, .5, .5, 1]
        },
        ReplayButton: {
            Position: vec2.fromValues(600, 600),
            Size: vec2.fromValues(200, 100),
            Text: "Replay!",
            TextHeight: 5
        },
        MenuButton: {
            Position: vec2.fromValues(600, 300),
            Size: vec2.fromValues(200, 100),
            Text: "Menu",
            TextHeight: 5
        }
    }
});
