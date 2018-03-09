/* File: Golem_States.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

Golem.prototype.updateState = function () {
    switch (this.mCurrentState) {
        case Config.Golem.States.WaitingToSpawn:
            this._serviceWaitingToSpawn();
            break;
        case Config.Golem.States.Spawning:
            this._serviceSpawning();
            break;
        case Config.Golem.States.Idle:
            this._serviceIdle();
            break;
        case Config.Golem.States.Patrolling:
            this._servicePatrolling();
            break;
        case Config.Golem.States.Smashing:
            this._serviceSmashing();
            break;
        case Config.Golem.States.AttackingPlatform:
            this._serviceAttackingPlatform();
            break;
        case Config.Golem.States.Retreating:
            this._serviceRetreating();
            break;
        case Config.Golem.States.Dying:
            this._serviceDying();
            break;
        case Config.Golem.States.Dead:
            this._serviceDead();
            break;
        default: console.log('Invalid Golem state');
            break;
    }
};

Golem.prototype.switchToState = function (state) {
    this.mCurrentState = state;
    this.mCurrentStateInitialized = false;
};