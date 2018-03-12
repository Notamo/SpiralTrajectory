/* 
 * Config_CreditsScreen.js
 */

"use strict";

var Config = Config || {};

Config.CreditsScreen = Object.freeze({
    Textures: {
        /*BackgroundImage: "assets/background/somefile.png",
        BackgroundNormal: "assets/background/somefileNormal.png"*/
    },
    Camera: {
        StartingPosition:     vec2.fromValues(25, 0),
        WorldWidth:           200,
        Viewport:             [0, 0, 960, 720],
        BackgroundColor:      [0.1, 0.1, 0.1, 1]
    },
    UI: {
        Title: {
            Text: "Credits",
            Position: vec2.fromValues(480, 640),
            TextHeight: 15,
            Color: [1, .84, 0, 1]
        },
        ReturnButton: {
            Position: vec2.fromValues(480, 100),
            Size: vec2.fromValues(240, 120),
            Text: "Return",
            TextHeight: 7
        },
        CreditsTextSet: {
            StartPos: vec2.fromValues(480, 500),
            TextHeight: 6,
            Color: [1, 0, 1, 1],
            Spacing: 30,
            Set: [
                "[to fill out]                    [to fill out]",
                "[to fill out]                    [to fill out]",
                "[to fill out]                    [to fill out]",
                "",
                "[to fill out]                    [to fill out]",
                "[to fill out]                    [to fill out]"
            ]
        },
    }
});
