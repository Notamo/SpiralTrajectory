/* File: Config_Boss.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, Config, Boss, vec2*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

var Config = Config || {};

Config.Boss = Object.freeze({
    States: {
        WaitingToSpawn:     0,      // Pre-spawn state, dunno if even needed.
        Spawning:           1,      // Spawning in
        Idle:               2,      // Idle, basiclaly not firing range atks, not sure if this is going to be used.
        Patrolling:         3,      // Moving around, firing ranged attacks
        MeleeSmashing:      4,      // Triggered if player gets too close, boss will try to smash.
        AttackingPlatform:  5,      // Smashing a platform the player is on.
        Dying:              6,      // Death animation.
        Dead:               7       // Maybe same state as WaitingToSpawn? Not sure yet.
    },
    StartingHP: 1000,
    Color: [1, 1, 1, 0],
    Physics: {
        Mass:           1000,
        Restitution:    1,
        Friction:       0.2
    }
});

