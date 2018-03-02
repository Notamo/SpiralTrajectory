/* File: Config_BossBattle.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, Config, BossBattle, vec2*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

var Config = Config || {};

Config.BossBattle = Object.freeze({
    Textures: {
        HeroSprite:             "assets/characters/hero.png",
        DefaultArrowSprite:     "assets/projectiles/arrow.png",
        IceArrowSprite:         "assets/projectiles/icearrow.png",
        FireArrowSprite:        "assets/projectiles/firearrow.png",
        BossSprite:             "assets/characters/boss_sprites.png",
        PlatformTexture:        "assets/props/platform.png",
        GroundTexture:          "assets/props/platform.png",
        WallTexture:            "assets/wall.png",
        TorchTexture:           "assets/props/torch1.png",
        TorchParticleTexture:   "assets/particles/particle.png",
        FlameParticleTexture:   "assets/particles/flameparticle.png"
    },
    Cameras: {
        MainCameraStartingPosition:     vec2.fromValues(25, 1),
        MainCameraWorldWidth:           200,
        MainCameraViewport:             [0, 0, 1200, 900],
        MainCameraBackgroundColor:      [0.8, 0.8, 0.8, 1],
        MainCameraInterpStiffness:      0.2,
        MainCameraInterpDuration:       30
    }
});
