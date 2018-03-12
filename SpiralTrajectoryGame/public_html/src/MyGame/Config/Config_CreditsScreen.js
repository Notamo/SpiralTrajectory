/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

var Config = Config || {};

Config.CreditsScreen = Object.freeze({
    Textures: {
        /*BackgroundImage: "assets/background/somefile.png",
        BackgroundNormal: "assets/background/somefileNormal.png"*/
    },
    Camera: {
        StartingPosition:     vec2.fromValues(0, 0),
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
        }
    }
});
