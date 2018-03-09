/* File: Golem_Stun.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

Golem.prototype.stun = function (time) {
    this.mStunned = true;
    this.mStunTimeRemaining = time;
    this.mInterrupt = true;
};

Golem.prototype.updateStun = function () {
    this.mStunTimeRemaining--;
    if (this.mStunTimeRemaining <= 0) {
        this.mStunTimeRemaining = 0;
        this.mStunned = false;
    }
};