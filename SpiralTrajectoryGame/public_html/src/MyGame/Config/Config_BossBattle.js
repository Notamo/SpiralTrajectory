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
        BossProjectileSprite:   "assets/projectiles/dummyBossProjectile.png",
        PlatformTexture:        "assets/props/platform.png",
        GroundTexture:          "assets/props/platform.png",
        WallTexture:            "assets/wall.png",
        GroundTorchTexture:     "assets/props/torch1.png",
        TorchParticleTexture:   "assets/particles/particle.png",
        FlameParticleTexture:   "assets/particles/flameparticle.png",
        SnowParticleTexture:    "assets/particles/snowparticle.png",
        BackgroundTexture:      "assets/background/backgroundtile.png"
    },
    Cameras: {
        MainCameraStartingPosition:     vec2.fromValues(25, 1),
        MainCameraWorldWidth:           200,
        MainCameraViewport:             [0, 0, 1200, 900],
        MainCameraBackgroundColor:      [0.8, 0.8, 0.8, 1],
        MainCameraInterpStiffness:      0.2,
        MainCameraInterpDuration:       30
    },
    Boss: {
        SpawnPosition: {
            X:  175,
            Y:  20
        },
        Size: {
            Width:  78,
            Height: 51
        }
    },
    Torches: {
        Ground: [
            {
                X:      50,
                Y:      5,
                Width:  10,
                Height: 10
            }
        ],
        Wall: [
            
        ],
        Ceiling: [
            
        ]
    },
    Walls: [
        {
            X:      -100,
            Y:      0,
            Width:  200,
            Height: 1000
        },
        {
            X:      400,
            Y:      0,
            Width:  200,
            Height: 1000
        }
    ],
    Ground: [
        {
            X:      150,
            Y:      -55,
            Width:  300,
            Height: 150
        }
    ], 
    Platforms: [
        {
            X:      40,
            Y:      30,
            Width:  20,
            Height: 5
        },
        {
            X:      120,
            Y:      30,
            Width:  20,
            Height: 5
        },
        {
            X:      80,
            Y:      60,
            Width:  20,
            Height: 5
        },
        {
            X:      20,
            Y:      80,
            Width:  20,
            Height: 5
        },
        {
            X:      140,
            Y:      80,
            Width:  20,
            Height: 5
        }
    ],
    Background: [
        {
            Width:  40,
            Height: 40
        }
    ]
});
