/* File: Config_BossProjectile.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, Config, BossBattle, vec2, Torch */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

var Config = Config || {};

Config.BossProjectile = Object.freeze({
    States: {
       Launch: 0,
       Chase: 1,
       Explode: 2
    },
    LaunchTime: 60,
    Lifespan: 2,
    MinAccuracy: .01,
    MaxAccuracy: .1,
    MinSpeed: 10,
    MaxSpeed: 100,
    Explosion: {
        NumParticles: 20,
        Lifespan: 1000,
        MinSize: 1,
        SizeMultiplier: 6,
        StartColor: [1, 1, 1, .2],
        FinalColor: [0, 0, 0, .5],
        BaseOffset: [0, 0],
        BaseVelocity: [-50, -50],
        VelocityMultiplier: [100, 100],
        SizeDelta: 0.98,
        Deceleration: .0001
    },
    Fizzle: {
        Lifespan: 100
    }
});
