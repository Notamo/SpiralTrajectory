/* 
 * File: Config_SplashScreen.js
 * 
 * Config Settings for the Splash Screen
 */


"use strict";

var Config = Config || {};

Config.SplashScreen = Object.freeze({
    Textures: {
        DefaultArrowSprite:     "assets/projectiles/arrow.png",
        DefaultFireArrowSprite: "assets/projectiles/firearrow.png",
        DefaultIceArrowSprite:  "assets/projectiles/icearrow.png",
        FlameParticleTexture:   "assets/particles/flameparticle.png",
        SnowParticleTexture:    "assets/particles/snowparticle.png",
        FarBackgroundTexture:   "assets/background/backgroundfar.png",
        MidBackgroundTexture:   "assets/background/backgroundmid.png"
    },
    Camera: {
        StartingPosition:     vec2.fromValues(25, 0),
        WorldWidth:           200,
        Viewport:             [0, 0, 960, 720],
        BackgroundColor:      [0.8, 0.8, 0.8, 1],
        InterpStiffness:      0.2,
        InterpDuration:       30
    },
    ArrowTimerLength: 400,
    UI: {
        Title: {
            Text: "Golem Smash",
            Position: vec2.fromValues(480, 640),
            TextHeight: 15,
            Color: [1, .84, 0, 1]
        },
        PlayButton: {
            Position: vec2.fromValues(480, 400),
            Size: vec2.fromValues(320, 160),
            Text: "Play!",
            TextHeight: 7
        },
        CreditsButton: {
            Position: vec2.fromValues(480, 160),
            Size: vec2.fromValues(320, 160),
            Text: "Credits",
            TextHeight: 7
        }
    }
});