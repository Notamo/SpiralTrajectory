/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Hero(spriteTexture) {
    this.kDelta = 0.3;

    this.mArcher = new SpriteRenderable(spriteTexture);
    this.mArcher.setColor([1, 1, 1, 0]);
    this.mArcher.getXform().setPosition(50, 40);
    this.mArcher.getXform().setSize(3, 4);
    this.mArcher.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, this.mArcher);
    
    var r = new RigidRectangle(this.getXform(), 3, 4);
    this.setRigidBody(r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
    
};