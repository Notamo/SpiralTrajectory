/* File: Golem_EmptyGameObject.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, EmptyGameObject, SpriteRenderable, vec2, Arrow, Platform, Config */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function GolemEmptyGameObject(parent, xOffset, yOffset) {
    EmptyGameObject.call(this, parent, xOffset, yOffset);
}
gEngine.Core.inheritPrototype(GolemEmptyGameObject, EmptyGameObject);

GolemEmptyGameObject.prototype.userCollisionHandling = function (other) {
    if (other instanceof GolemEmptyGameObject) {
        return true;
    }
    return false;
};