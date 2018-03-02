/* File: Config_Torch.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, Config, BossBattle, vec2, Torch */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

var Config = Config || {};

Config.Torch = Object.freeze({
    Types: {
        Ground:  0,
        Wall:    1,
        Ceiling: 2
    },
    0: {
        Color: [1, 1, 1, 0],
        Particle: {
            Count:                      20,
            MinimumLifespan:            30,
            LifespanMultiplier:         200,
            Color:                      [1, 0, 0, 1],
            XOffset:                    0,
            YOffset:                    2,
            MinSize:                    1,
            SizeMultiplier:             6,
            MinFinalColor:              [3.5, 0.4, 0.3, 0.6],
            MinFinalColorMultipliers:   [0, 0.1, 0.1, 1],
            XVelocityMultiplier:        20,
            XVelocityOffset:            -10,
            YVelocityMultiplier:        20,
            YVelocityOffset:            -10,
            SizeDelta:                  0.98,
            Acceleration:               [0, 0]
        }
    },
    1: {
        Particle: {
            Count:                      20,
            MinimumLifespan:            30,
            LifespanMultiplier:         200,
            Color:                      [1, 0, 0, 1],
            XOffset:                    0,
            YOffset:                    2,
            MinSize:                    1,
            SizeMultiplier:             6,
            MinFinalColor:              [3.5, 0.4, 0.3, 0.6],
            MinFinalColorMultipliers:   [0, 0.1, 0.1, 1],
            XVelocityMultiplier:        20,
            XVelocityOffset:            -10,
            YVelocityMultiplier:        20,
            YVelocityOffset:            -10,
            SizeDelta:                  0.98,
            Acceleration:               [0, 0]
        }
    },
    2: {
        Particle: {
            Count:                      20,
            MinimumLifespan:            30,
            LifespanMultiplier:         200,
            Color:                      [1, 0, 0, 1],
            XOffset:                    0,
            YOffset:                    2,
            MinSize:                    1,
            SizeMultiplier:             6,
            MinFinalColor:              [3.5, 0.4, 0.3, 0.6],
            MinFinalColorMultipliers:   [0, 0.1, 0.1, 1],
            XVelocityMultiplier:        20,
            XVelocityOffset:            -10,
            YVelocityMultiplier:        20,
            YVelocityOffset:            -10,
            SizeDelta:                  0.98,
            Acceleration:               [0, 0]
        }
    }
});