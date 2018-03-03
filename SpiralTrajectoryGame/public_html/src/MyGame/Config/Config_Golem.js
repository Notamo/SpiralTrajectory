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
        WaitingToSpawn:     0,      // Pre-spawn state, dunno if even needed.
        Spawning:           1,      // Spawning in
        Idle:               2,      // Idle, basiclaly not firing range atks, not sure if this is going to be used.
        Patrolling:         3,      // Moving around, firing ranged attacks
        Smashing:           4,      // Triggered if player gets too close, golem will try to smash.
        AttackingPlatform:  5,      // Smashing a platform the player is on.
        Dying:              6,      // Death animation.
        Dead:               7       // Maybe same state as WaitingToSpawn? Not sure yet.
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
            Speed:      4
        }
    },
    Properties: {
        StartingHP: 1000,
        Color:  [1, 1, 1, 0],
        Physics: {
            Mass:           0,
            Restitution:    1,
            Friction:       0.2
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
            Physics: {
                Mass:           0,
                Restitution:    0,
                Friction:       1
            }
        }
    }
});

