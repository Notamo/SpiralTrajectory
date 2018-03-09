/* File: Golem_EmptyGameObject.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, EmptyGameObject, SpriteRenderable, vec2, Arrow, Platform, Config, IceArrow, Hero */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function GolemEmptyGameObject(parent, xOffset, yOffset, multiplier, bodyPart) {
    this.mDamageMultiplier = multiplier;
    this.mIgnoreCollision = false;
    this.mBodyPart = bodyPart;
    this.mWidthOffset = 0;
    this.mHeightOffset = 0;
    this.mRadiusOffset = 0;
    EmptyGameObject.call(this, parent, xOffset, yOffset);
}
gEngine.Core.inheritPrototype(GolemEmptyGameObject, EmptyGameObject);

GolemEmptyGameObject.prototype.userCollisionHandling = function (other) {
    if (this.mIgnoreCollision === true) {
        return true;
    }
    
    if (other instanceof GolemEmptyGameObject) {
        return true;
    }
    
    if (other instanceof Arrow) { 
        if (other.getCollided() === false) {
            this.mParent.hit(other.getDamage() * this.mDamageMultiplier);
            if (other instanceof IceArrow) {
                this.mParent.stun(other.getEffectDuration());
            }
        }
    }
    
    if (other instanceof Hero && 
        (this.mBodyPart === Config.Golem.Rigidbodies.RightHand.Name || 
        this.mBodyPart === Config.Golem.Rigidbodies.RightWrist.Name) && 
        this.mParent.getCurrentState() === Config.Golem.States.Smashing) {
        this.mParent.triggerSmashEvent(this);
    }
    return false;
};

GolemEmptyGameObject.prototype.ignoreCollision = function () {
    this.mIgnoreCollision = true;
};

GolemEmptyGameObject.prototype.allowCollision = function() {
    this.mIgnoreCollision = false;
};

GolemEmptyGameObject.prototype.getBodyPart = function () {
    return this.mBodyPart;
};