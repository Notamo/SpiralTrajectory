/* File: Golem_Dying.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

Golem.prototype._serviceDying = function () {
    // Initialize state.
    if (this.mCurrentStateInitialized === false) {
        // We want collisions if the boss is idle
        if (this.mIgnoreCollision === false) {
            this.ignoreCollision();
            this.mIgnoreCollision = true;
        }
        
        this.setVisibility(true);
        this._animate(Config.Golem.Animations.Death, true);
        this.mCenterX.configInterpolation(
            Config.Golem.States.Patrolling.Interpolation.Stiffness,
            Config.Golem.States.Patrolling.Interpolation.Duration
        );
        this.mCenterY.configInterpolation(
            Config.Golem.States.Patrolling.Interpolation.Stiffness,
            Config.Golem.States.Patrolling.Interpolation.Duration
        );
        this.mStateStartTime = Date.now();
        this.mMiscTracker = Date.now();
        this.xOffset = Config.Golem.States.Patrolling.Interpolation.XOffset;
        this.yOffset = Config.Golem.States.Patrolling.Interpolation.YOffset;
        this.mCurrentStateInitialized = true;
    }
    
    // When death anim is complete we transition to the dead state.
    if (this._animationComplete()) {
        this.mCurrentState = Config.Golem.States.Dead;
        this.mCurrentStateInitialized = false;
    }
    
    this.mGolem.updateAnimation();
};

Golem.prototype._serviceDead = function () {
    // Initialize state.
    if (this.mCurrentStateInitialized === false) {
        // We want collisions if the boss is idle
        if (this.mIgnoreCollision === false) {
            this.ignoreCollision();
            this.mIgnoreCollision = true;
        }
        
        this.setVisibility(false);
        this.mCenterX.configInterpolation(
            Config.Golem.States.Patrolling.Interpolation.Stiffness,
            Config.Golem.States.Patrolling.Interpolation.Duration
        );
        this.mCenterY.configInterpolation(
            Config.Golem.States.Patrolling.Interpolation.Stiffness,
            Config.Golem.States.Patrolling.Interpolation.Duration
        );
        this.mStateStartTime = Date.now();
        this.mMiscTracker = Date.now();
        this.xOffset = Config.Golem.States.Patrolling.Interpolation.XOffset;
        this.yOffset = Config.Golem.States.Patrolling.Interpolation.YOffset;
        this.mCurrentStateInitialized = true;
    }
};