/* File: EmptyGameObject.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, Renderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function EmptyGameObject(parent, xOffset, yOffset) {
    this.mParent = parent;
    this.mXOffset = xOffset;
    this.mYOffset = yOffset;
    if (this.mXOffset === null) {
        this.mXOffset = 0;
    }
    if (this.mYOffset === null) {
        this.mYOffset = 0;
    }
    this.mRenderable = new Renderable();
    GameObject.call(this, this.mRenderable);
}
gEngine.Core.inheritPrototype(EmptyGameObject, GameObject);

EmptyGameObject.prototype.draw = function (aCamera) {
    if ((this.mRigidBody !== null) && (this.mDrawRigidShape))
        this.mRigidBody.draw(aCamera);
};

EmptyGameObject.prototype.update = function () {
    if (this.mParent === null) {
        this.setExpired(true);
    }
    
    if (this.mRigidBody !== null) {
        this.mRigidBody.update();
        this.mRigidBody.setAngularVelocity(0);
    }

    this.getXform().setPosition(
        this.mParent.getXform().getXPos() + this.mXOffset,
        this.mParent.getXform().getYPos() + this.mYOffset
    );
};