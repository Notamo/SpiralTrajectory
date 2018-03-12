/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";

var Config = Config || {};

Config.SplashScreen = Object.freeze({
    Textures: {
        DefaultArrowSprite:     "assets/projectiles/arrow.png",
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
        PlayButton: {
            Position: vec2.fromValues(600, 600),
            Size: vec2.fromValues(200, 100),
            Text: "Play!",
            TextHeight: 5
        },
        CreditsButton: {
            Position: vec2.fromValues(600, 300),
            Size: vec2.fromValues(200, 100),
            Text: "Credits",
            TextHeight: 5
        }
    }
});