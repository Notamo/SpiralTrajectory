/* 
 * File: Config_Golem.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, Config, Golem, vec2, SpriteRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

var Config = Config || {};

Config.Golem = Object.freeze({
    States: {
        WaitingToSpawn: {
        },    
        Spawning: {
            
        },
        Idle: {
            
        },
        Patrolling: {
            Interpolation: {
                Stiffness: 0.01,
                Duration: 60,
                XOffset: 2,
                YOffset: 60,
                Interval: 5000
            },
            ProjectileFiringInterval:   5000,
            ChanceToChaseHeroYPos:  0.01,
            MaxHeight: 180,
            MinHeight: 20,
            MaxNonChaseXDistance: 85,
            MinXDistance: 15
        },
        Smashing: {
            
        },
        AttackingPlatform: {
            
        },
        Retreating: {
            
        },
        Dying: {
            Interpolation: {
                Stiffness: 1,
                Duration: 1,
                XOffset: 0,
                YOffset: 0
            }
        },
        Dead: {
            
        },
        FacingLeft: 1,
        FacingRight: -1
    },
    Projectiles: {
        Salvo: {
            Chance: 0.35,
            Physics: {
                Gravity: false,
                Mass: 0.1,
                Friction: 1,
                Restitution: 1 
            },
            Color: [1, 1, 1, 0],
            Count: 8,
            Radius: 5,
            TravelHeight: vec2.fromValues(0, 40),
            LaunchOffset: vec2.fromValues(0, 15),
            DefaultFireDirection: vec2.fromValues(0.1, 1),
            DefaultVelocity: vec2.fromValues(0, 30),
            TargetOffset: vec2.fromValues(10, 0),
            MinAccuracy: 0.01,
            MaxAccuracy: 0.1,
            AccuracyDivisor: 0.03,
            MinSpeed: 10,
            MaxSpeed: 100,
            SpeedDivisor: 0.03
        },
        Burst: {
            Chance: 0.8
            
        },
        Blast: {
            Chance: 1.0,
            Physics: {
                Gravity: false,
                Mass: 0.1,
                Friction: 1,
                Restitution: 1 
            },
            StartRadius: 10,
            EndRadius: 50,
            Color: [1, 1, 1, 0],
            WindupTime:  180,
            RotationDelta: 0.5,
            YOffset: 8,
            BasePower: vec2.fromValues(1.5, 1.5),
            PowerDelta: vec2.fromValues(1.025, 1.025),
            BaseDamage: 100
        }
    },
    Animations: {
        Spawn: {
            TopLeftX:   470,
            TopLeftY:   0,
            Width:      256,
            Height:     170,
            Count:      15,
            Padding:    0,
            Type:       function(){ return SpriteAnimateRenderable.eAnimationType.eAnimateRight; },
            Speed:      4
        },
        Idle: {
            TopLeftX:   982,
            TopLeftY:   0,
            Width:      256,
            Height:     170,
            Count:      6,
            Padding:    0,
            Type:       function(){ return SpriteAnimateRenderable.eAnimationType.eAnimateSwing; },
            Speed:      4
        },
        Patrolling: {
            TopLeftX:   982,
            TopLeftY:   0,
            Width:      256,
            Height:     170,
            Count:      6,
            Padding:    0,
            Type:       function(){ return SpriteAnimateRenderable.eAnimationType.eAnimateSwing; },
            Speed:      4
        },
        Smash: {
            TopLeftX:   726,
            TopLeftY:   0,
            Width:      256,
            Height:     170,
            Count:      6,
            Padding:    0,
            Type:       function(){ return SpriteAnimateRenderable.eAnimationType.eAnimateRight; },
            Speed:      4
        },
        Death: {
            TopLeftX:   214,
            TopLeftY:   0,
            Width:      256,
            Height:     170,
            Count:      7,
            Padding:    0,
            Type:       function(){ return SpriteAnimateRenderable.eAnimationType.eAnimateRight; },
            Speed:      6
        }
    },
    Properties: {
        StartingHP: 10000,
        Color:  [1, 1, 1, 0],
        Physics: {
            Mass:           0,
            Restitution:    1,
            Friction:       0.2
        },
        Interpolation: {
            DefaultSitffness:  0.1,
            DefaultDuration:   2
        }
    },
    Rigidbodies: {
        Head: {
            Name:               "Head",
            Type:               function(){ return Config.Engine.RigidShapeTypes.Rectangle; },
            XOffset:            1.6,
            YOffset:            19.4,
            WidthMultiplier:    0.2,
            HeightMultiplier:   0.13,
            DamageMultiplier:   2.0,
            Physics: {
                Mass:           0,
                Restitution:    1,
                Friction:       1
            }
        },
        Body: {
            Name:               "Body",
            Type:               function(){ return Config.Engine.RigidShapeTypes.Rectangle; },
            XOffset:            1,
            YOffset:            5.5,
            WidthMultiplier:    0.23,
            HeightMultiplier:   0.44,
            DamageMultiplier:   1.0,
            Physics: {
                Mass:           0,
                Restitution:    1,
                Friction:       1
            }
        },
        Padding: {
            Name:               "Padding",
            Type:               function(){ return Config.Engine.RigidShapeTypes.Rectangle; },
            XOffset:            10,
            YOffset:            8.5,
            WidthMultiplier:    0.15,
            HeightMultiplier:   0.3,
            DamageMultiplier:   1.0,
            Physics: {
                Mass:           0,
                Restitution:    1,
                Friction:       1
            }
        },
        RightShoulder: {
            Name:               "RightShoulder",
            Type:               function(){ return Config.Engine.RigidShapeTypes.Circle; },
            XOffset:            -13,
            YOffset:            10,
            WidthMultiplier:    1,
            HeightMultiplier:   1,
            Radius:             8.8,
            DamageMultiplier:   1.0,
            Physics: {
                Mass:           0,
                Restitution:    0,
                Friction:       1
            }
        },
        LeftShoulder: {
            Name:               "LeftShoulder",
            Type:               function(){ return Config.Engine.RigidShapeTypes.Circle; },
            XOffset:            20,
            YOffset:            10,
            WidthMultiplier:    1,
            HeightMultiplier:   1,
            Radius:             8.8,
            DamageMultiplier:   1.0,
            Physics: {
                Mass:           0,
                Restitution:    0,
                Friction:       1
            }
        },
        RightHand: {
            Name:               "RightHand",
            Type:               function(){ return Config.Engine.RigidShapeTypes.Circle; },
            XOffset:            -25,
            YOffset:            -6.5,
            WidthMultiplier:    1,
            HeightMultiplier:   1,
            Radius:             8,
            DamageMultiplier:   1.0,
            Physics: {
                Mass:           0,
                Restitution:    0,
                Friction:       1
            }
        },
        RightWrist: {
            Name:               "RightWrist",
            Type:               function(){ return Config.Engine.RigidShapeTypes.Circle; },
            XOffset:            -20,
            YOffset:            -11,
            WidthMultiplier:    1,
            HeightMultiplier:   1,
            Radius:             6,
            DamageMultiplier:   1.0,
            Physics: {
                Mass:           0,
                Restitution:    0,
                Friction:       1
            }
        },
        LeftHand: {
            Name:               "LeftHand",
            Type:               function(){ return Config.Engine.RigidShapeTypes.Circle; },
            XOffset:            24,
            YOffset:            -8.5,
            WidthMultiplier:    1,
            HeightMultiplier:   1,
            Radius:             8,
            DamageMultiplier:   1.0,
            Physics: {
                Mass:           0,
                Restitution:    0,
                Friction:       1
            }
        },
        LeftWrist: {
            Name:               "LeftWrist",
            Type:               function(){ return Config.Engine.RigidShapeTypes.Circle; },
            XOffset:            24,
            YOffset:            -8.5,
            WidthMultiplier:    1,
            HeightMultiplier:   1,
            Radius:             4,
            DamageMultiplier:   1.0,
            Physics: {
                Mass:           0,
                Restitution:    0,
                Friction:       1
            }
        }
    }
});
