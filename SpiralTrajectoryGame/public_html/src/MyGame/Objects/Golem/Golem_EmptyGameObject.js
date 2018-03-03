/* File: Golem_EmptyGameObject.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, EmptyGameObject, SpriteRenderable, vec2, Arrow, Platform, Config */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function GolemEmptyGameObject(parent, xOffset, yOffset, multiplier) {
    this.mDamageMultiplier = multiplier;
    EmptyGameObject.call(this, parent, xOffset, yOffset);
}
gEngine.Core.inheritPrototype(GolemEmptyGameObject, EmptyGameObject);

GolemEmptyGameObject.prototype.userCollisionHandling = function (other) {
    if (other instanceof GolemEmptyGameObject) {
        return true;
    }
    
    if (other instanceof Arrow) { 
        if (other.getCollided() === false) {
        this.mParent.hit(other.getDamage());
    }
    }
    return false;
};