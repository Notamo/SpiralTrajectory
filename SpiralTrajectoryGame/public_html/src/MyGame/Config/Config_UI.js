/* Config_UI.js
 *      Configuration Settings for the user interface
 */

"use strict";

var Config = Config || {};

Config.UI = Object.freeze({
    Textures: {
        UIArrowIcon:            "assets/UI/arrowicon.png",
        UIFireArrowIcon:        "assets/UI/firearrowicon.png",
        UIIceArrowIcon:         "assets/UI/icearrowicon.png",
        UIArrowBorders:         "assets/UI/activearrowborder.png",
        UIHealthBar:            "assets/UI/healthbar.png"
    },
    ArrowSelection: {
        ActiveTint: [1, 1, 1, 0],
        InactiveTint: [.1, .1, .1, .5]
    },
    HeroHealthBar: {
        Position: vec2.fromValues(150, 750),
        Size: vec2.fromValues(300, 25),
        Buffer: 4
    },
    BossName: {
        Text: "Mysterious Golem",
        Position: vec2.fromValues(210, 130),
        Color: [1, 1, 1, 1],
        TextHeight: 4
    },
    BossHealthBar: {
        Position: vec2.fromValues(600, 100),
        Size: vec2.fromValues(800, 25),
        Buffer: 4
    }
});
