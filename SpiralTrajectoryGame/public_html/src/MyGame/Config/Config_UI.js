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
        UIArrowBorders:         "assets/UI/activearrowborder.png"
    },
    ArrowSelection: {
        ActiveTint: [1, 1, 1, 0],
        InactiveTint: [.1, .1, .1, .5]
    },
    HeroHealthBar: {
        Position: [100, 600],
        Size: [100, 50]
    },
    BossHealthBar: {
        Position: [450, 100],
        Size: [400, 50]
    }
});
