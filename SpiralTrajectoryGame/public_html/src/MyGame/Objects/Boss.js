/* File: Boss.js 
 *
 * Creates and initializes the Boss
 * overrides the update function of GameObject to define
 * simple Boss behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Boss(spriteTexture) {
    this.kDelta = 0.3;

    this.mGolem = new SpriteRenderable(spriteTexture);
    this.mGolem.setColor([1, 1, 1, 0]);
    this.mGolem.getXform().setPosition(50, 40);
    this.mGolem.getXform().setSize(3, 4);
    this.mGolem.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, this.mGolem);
    
    var r = new RigidRectangle(this.getXform(), 3, 4);
    this.setRigidBody(r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Boss, GameObject);

Boss.prototype.update = function () {
    
};