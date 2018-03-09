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
            Cooldown: 3000
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
            Name:               "Spawn",
            TopLeftX:           470,
            TopLeftY:           0,
            Width:              256,
            Height:             170,
            Count:              15,
            Padding:            0,
            Type:               function(){ return SpriteAnimateRenderable.eAnimationType.eAnimateRight; },
            Speed:              4,
            AnimateRigidbodies: false
        },
        Idle: {
            Name:               "Idle",
            TopLeftX:           982,
            TopLeftY:           0,
            Width:              256,
            Height:             170,
            Count:              6,
            Padding:            0,
            Type:               function(){ return SpriteAnimateRenderable.eAnimationType.eAnimateSwing; },
            Speed:              4,
            AnimateRigidbodies: false
        },
        Patrolling: {
            Name:               "Patrolling",
            TopLeftX:           982,
            TopLeftY:           0,
            Width:              256,
            Height:             170,
            Count:              6,
            Padding:            0,
            Type:               function(){ return SpriteAnimateRenderable.eAnimationType.eAnimateSwing; },
            Speed:              4,
            AnimateRigidbodies: false
        },
        Smash: {
            Name:               "Smash",
            TopLeftX:           726,
            TopLeftY:           0,
            Width:              256,
            Height:             170,
            Count:              6,
            Padding:            0,
            Type:               function(){ return SpriteAnimateRenderable.eAnimationType.eAnimateRight; },
            Speed:              6,
            AnimateRigidbodies: true
        },
        Death: {
            Name:               "Death",
            TopLeftX:           214,
            TopLeftY:           0,
            Width:              256,
            Height:             170,
            Count:              7,
            Padding:            0,
            Type:               function(){ return SpriteAnimateRenderable.eAnimationType.eAnimateRight; },
            Speed:              6,
            AnimateRigidbodies: false
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
        },
        SmashDamage: 200,
        SmashVelocity: vec2.fromValues(-30, 200)
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
            },
            Animations: {
                Smash: {
                    0: {
                        XOffset: 4.2,
                        YOffset: -1.8,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    1: {
                        XOffset: 5.1,
                        YOffset: -2.0,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    2: {
                        XOffset: 5.65,
                        YOffset: -2.3,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    3: {
                        XOffset: 3.8,
                        YOffset: -1.5,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    4: {
                        XOffset: 4.2,
                        YOffset: -1.8,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    5: {
                        XOffset: 4.4,
                        YOffset: -1.6,
                        WidthOffset: 0,
                        HeightOffset: 0
                    }         
                }
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
            },
            Animations: {
                Smash: {
                    0: {
                        XOffset: 4.6,
                        YOffset: -1.8,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    1: {
                        XOffset: 4.6,
                        YOffset: -1.8,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    2: {
                        XOffset: 4.6,
                        YOffset: -1.8,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    3: {
                        XOffset: 4.6,
                        YOffset: -1.8,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    4: {
                        XOffset: 4.6,
                        YOffset: -1.8,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    5: {
                        XOffset: 4.6,
                        YOffset: -1.8,
                        WidthOffset: 0,
                        HeightOffset: 0
                    }         
                }
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
            },
            Animations: {
                Smash: {
                    0: {
                        XOffset: 4,
                        YOffset: -1.6,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    1: {
                        XOffset: 4,
                        YOffset: -2.0,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    2: {
                        XOffset: 4,
                        YOffset: -2.2,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    3: {
                        XOffset: 4,
                        YOffset: -1.4,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    4: {
                        XOffset: 4,
                        YOffset: -1.6,
                        WidthOffset: 0,
                        HeightOffset: 0
                    },
                    5: {
                        XOffset: 4,
                        YOffset: -1.6,
                        WidthOffset: 0,
                        HeightOffset: 0
                    }         
                }
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
            },
            Animations: {
                Smash: {
                    0: {
                        XOffset: 5.1,
                        YOffset: -2.6,
                        RadiusOffset: 30
                    },
                    1: {
                        XOffset: 5.5,
                        YOffset: -1.55,
                        RadiusOffset: 30
                    },
                    2: {
                        XOffset: 6.0,
                        YOffset: -1.1,
                        RadiusOffset: 30
                    },
                    3: {
                        XOffset: 4.5,
                        YOffset: -2.1,
                        RadiusOffset: 30
                    },
                    4: {
                        XOffset: 5.0,
                        YOffset: -2.7,
                        RadiusOffset: 30
                    },
                    5: {
                        XOffset: 5.3,
                        YOffset: -2.6,
                        RadiusOffset: 30
                    }         
                }
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
            },
            Animations: {
                Smash: {
                    0: {
                        XOffset: 4.9,
                        YOffset: -2.25,
                        RadiusOffset: 0
                    },
                    1: {
                        XOffset: 4.8,
                        YOffset: -3.2,
                        RadiusOffset: 0
                    },
                    2: {
                        XOffset: 4.7,
                        YOffset: -4.0,
                        RadiusOffset: 0
                    },
                    3: {
                        XOffset: 3.5,
                        YOffset: -1.35,
                        RadiusOffset: 0
                    },
                    4: {
                        XOffset: 4.5,
                        YOffset: -1.4,
                        RadiusOffset: 0
                    },
                    5: {
                        XOffset: 4.5,
                        YOffset: -2.1,
                        RadiusOffset: 0
                    }         
                }
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
            },
            Animations: {
                Smash: {
                    0: {
                        XOffset: 5.3,
                        YOffset: -4.7,
                        RadiusOffset: 0
                    },
                    1: {
                        XOffset: -1.9,
                        YOffset: 18.5,
                        RadiusOffset: 0
                    },
                    2: {
                        XOffset: 0.8,
                        YOffset: 23.8,
                        RadiusOffset: 0
                    },
                    3: {
                        XOffset: -6,
                        YOffset: 0,
                        RadiusOffset: 0
                    },
                    4: {
                        XOffset: 1.0,
                        YOffset: -4.5,
                        RadiusOffset: 0
                    },
                    5: {
                        XOffset: 5.3,
                        YOffset: -4.7,
                        RadiusOffset: 0
                    }         
                }
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
            },
            Animations: {
                Smash: {
                    0: {
                        XOffset: 0,
                        YOffset: 0,
                        RadiusOffset: 0
                    },
                    1: {
                        XOffset: -6.2,
                        YOffset: 15.7,
                        RadiusOffset: 0
                    },
                    2: {
                        XOffset: -5,
                        YOffset: 21.3,
                        RadiusOffset: 0
                    },
                    3: {
                        XOffset: -5,
                        YOffset: 5,
                        RadiusOffset: 0
                    },
                    4: {
                        XOffset: 1.5,
                        YOffset: 2,
                        RadiusOffset: 0
                    },
                    5: {
                        XOffset: 0,
                        YOffset: 0,
                        RadiusOffset: 0
                    }         
                }
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
            },
            Animations: {
                Smash: {
                    0: {
                        XOffset: 4.4,
                        YOffset: -2.3,
                        RadiusOffset: 0
                    },
                    1: {
                        XOffset: 3.1,
                        YOffset: -2.8,
                        RadiusOffset: 0
                    },
                    2: {
                        XOffset: 2.7,
                        YOffset: -3.0,
                        RadiusOffset: 0
                    },
                    3: {
                        XOffset: 4.5,
                        YOffset: -2.0,
                        RadiusOffset: 0
                    },
                    4: {
                        XOffset: 4.7,
                        YOffset: -2.2,
                        RadiusOffset: 0
                    },
                    5: {
                        XOffset: 4.25,
                        YOffset: -2.3,
                        RadiusOffset: 0
                    }         
                }
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
            },
            Animations: {
                Smash: {
                    0: {
                        XOffset: 9,
                        YOffset: 1.7,
                        RadiusOffset: 0
                    },
                    1: {
                        XOffset: 7.5,
                        YOffset: 1.5,
                        RadiusOffset: 0
                    },
                    2: {
                        XOffset: 7.5,
                        YOffset: 1.3,
                        RadiusOffset: 0
                    },
                    3: {
                        XOffset: 9,
                        YOffset: 2.0,
                        RadiusOffset: 0
                    },
                    4: {
                        XOffset: 9,
                        YOffset: 1.7,
                        RadiusOffset: 0
                    },
                    5: {
                        XOffset: 9,
                        YOffset: 1.7,
                        RadiusOffset: 0
                    }         
                }
            }
        }
    }
});

