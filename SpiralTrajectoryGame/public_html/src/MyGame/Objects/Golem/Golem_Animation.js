/* File: Golem_Animation.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

Golem.prototype._animate = function (animation, reset) {
    for (var animType in Config.Golem.Animations) {
        if (Config.Golem.Animations[animType] === animation) {
            this.mGolem.setSpriteSequence(
                animation.TopLeftX,
                animation.TopLeftY,
                animation.Width,
                animation.Height,
                animation.Count,
                animation.Padding
            );
            this.mGolem.setAnimationType(animation.Type.call());
            this.mGolem.setAnimationSpeed(animation.Speed);
            if (animation.AnimateRigidbodies === true) {
                this.mCurrentRigidbodyAnimationSequenceReference = animation.Name;
            } else {
                this.mCurrentRigidbodyAnimationSequenceReference = null;
            }
            break;
        }
    }
    
    if (reset === true) {
        this.mGolem.resetAnimation();
    }
};

Golem.prototype._animationComplete = function () {
    if (this.mGolem.mCurrentElm >= this.mGolem.mNumElems - 1) {
        return true;
    }
    return false;
};

Golem.prototype.faceHero = function () {
    var golemXform = this.mGolem.getXform();
    var heroXform = this.mHero.getXform();
    
    // Have the boss face the hero
    if (heroXform.getXPos() < golemXform.getXPos() && 
        this.mFacing === Config.Golem.States.FacingRight) {
        this.switchDirection();
    } else if (heroXform.getXPos() > golemXform.getXPos() &&
        this.mFacing === Config.Golem.States.FacingLeft) {
        this.switchDirection();
    }
};