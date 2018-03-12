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
        UIHealthBar:            "assets/UI/healthbar.png",
        UIButton:               "assets/UI/button.png"
    },
    ArrowSelection: {
        Position: vec2.fromValues(120, 680),
        IconSize: 80,
        ActiveTint: [1, 1, 1, 0],
        InactiveTint: [.1, .1, .1, .5]
    },
    HeroHealthBar: {
        Position: vec2.fromValues(120, 600),
        Size: vec2.fromValues(240, 20),
        Buffer: 4
    },
    BossName: {
        Text: "Mysterious Golem",
        Position: vec2.fromValues(168, 100),
        Color: [1, 1, 1, 1],
        TextHeight: 4
    },
    BossHealthBar: {
        Position: vec2.fromValues(480, 80),
        Size: vec2.fromValues(640, 20),
        Buffer: 4
    }
});
