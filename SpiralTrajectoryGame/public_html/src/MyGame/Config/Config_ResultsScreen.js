/* 
 * Config_ResultsScreen.js
 * 
 * Config settings for the results screen
 */

"use strict";

var Config = Config || {};

Config.ResultsScreen = Object.freeze({
    Textures: {
        FarBackgroundTexture:   "assets/background/backgroundfar.png",
        MidBackgroundTexture:   "assets/background/backgroundmid.png"
    },
    Camera: {
        StartingPosition:     vec2.fromValues(25, 0),
        WorldWidth:           200,
        Viewport:             [0, 0, 1200, 900],
        BackgroundColor:      [0.8, 0.8, 0.8, 1],
        InterpStiffness:      0.2,
        InterpDuration:       30
    },
    ArrowTimerLength: 400,
    UI: {
        Title: {
            Text: "Golem Smash",
            Position: vec2.fromValues(600, 800),
            TextHeight: 10,
            Color: [1, .84, 0, 1]
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
