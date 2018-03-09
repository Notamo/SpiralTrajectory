/* File: Golem_MeleeAttacks.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

Golem.prototype._serviceSmashing = function () {
    if (this.mCurrentStateInitialized === false) {
        // We want collisions if the boss is smashing
        if (this.mIgnoreCollision === true) {
            this.allowCollision();
            this.mIgnoreCollision = false;
        }
        
        this.mCurrentSmashAttackHit = false;
        this.setVisibility(true);
        this._animate(Config.Golem.Animations.Smash, true);
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
    this.faceHero();

    if (this._animationComplete()) {
        this.switchToState(this.mPreviousState);
    }    
    
    //this.interpolate();
    this.mGolem.updateAnimation();
};

Golem.prototype._serviceAttackingPlatform = function () {
    
};