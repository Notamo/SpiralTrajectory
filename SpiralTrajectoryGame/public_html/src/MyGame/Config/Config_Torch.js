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
        MaxTimeLit: 1200,
        Particle: {
            MinLifespan:                30,
            LifespanMultiplier:         200, 
            ColorRed:                   1,
            ColorGreen:                 0,
            ColorBlue:                  0,
            ColorAlpha:                 1,
            BaseXOffset:                -1,
            XOffsetMultiplier:          2,
            BaseYOffset:                3,
            YOffsetMultiplier:          0,
            MinSize:                    1,
            SizeMultiplier:             6,
            MinFinalColor:              [3.5, 0.2, 0.1, 0.5],
            MinFinalColorMultipliers:   [0, 0.1, 0.1, 0],
            BaseXVelocity:              5,
            XVelocityMultiplier:        10,
            BaseYVelocity:              0,
            YVelocityMultiplier:        20,
            SizeDelta:                  0.98,
            BaseXAcceleration:          0,
            XAccelerationMultiplier:    0,
            BaseYAcceleration:          5,
            YAccelerationMultiplier:    5
        }
    },
    1: {
        Color: [1, 1, 1, 0],
        MaxTimeLit: 1200,
        Particle: {
            MinLifespan:                30,
            LifespanMultiplier:         200, 
            ColorRed:                   1,
            ColorGreen:                 0,
            ColorBlue:                  0,
            ColorAlpha:                 1,
            BaseXOffset:                -1,
            XOffsetMultiplier:          2,
            BaseYOffset:                3,
            YOffsetMultiplier:          0,
            MinSize:                    1,
            SizeMultiplier:             6,
            MinFinalColor:              [3.5, 0.2, 0.1, 0.5],
            MinFinalColorMultipliers:   [0, 0.1, 0.1, 0],
            BaseXVelocity:              5,
            XVelocityMultiplier:        10,
            BaseYVelocity:              0,
            YVelocityMultiplier:        20,
            SizeDelta:                  0.98,
            BaseXAcceleration:          0,
            XAccelerationMultiplier:    0,
            BaseYAcceleration:          5,
            YAccelerationMultiplier:    5
        }
    },
    2: {
        Color: [1, 1, 1, 0],
        MaxTimeLit: 1200,
        Particle: {
            MinLifespan:                30,
            LifespanMultiplier:         200, 
            ColorRed:                   1,
            ColorGreen:                 0,
            ColorBlue:                  0,
            ColorAlpha:                 1,
            BaseXOffset:                -1,
            XOffsetMultiplier:          2,
            BaseYOffset:                3,
            YOffsetMultiplier:          0,
            MinSize:                    1,
            SizeMultiplier:             6,
            MinFinalColor:              [3.5, 0.2, 0.1, 0.5],
            MinFinalColorMultipliers:   [0, 0.1, 0.1, 0],
            BaseXVelocity:              5,
            XVelocityMultiplier:        10,
            BaseYVelocity:              0,
            YVelocityMultiplier:        20,
            SizeDelta:                  0.98,
            BaseXAcceleration:          0,
            XAccelerationMultiplier:    0,
            BaseYAcceleration:          5,
            YAccelerationMultiplier:    5
        }
    }
});