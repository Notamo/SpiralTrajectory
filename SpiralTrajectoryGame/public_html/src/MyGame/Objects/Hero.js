/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, RigidShape, RigidRectangle,
 *       Platform */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Hero(spriteTexture) {
    // Create the sprite
    this.mArcher = new SpriteRenderable(spriteTexture);
    this.mArcher.setColor([1, 1, 1, 0]);
    this.mArcher.getXform().setPosition(0, 0);
    this.mArcher.getXform().setSize(12, 12);
    this.mArcher.setElementPixelPositions(93, 403, 97, 440);
    GameObject.call(this, this.mArcher);
    
    // Physics
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getWidth() / 2,
        this.getXform().getHeight() / 1.07
    );
    r.setMass(1);
    r.setRestitution(1);
    r.setFriction(1);  
    this.setRigidBody(r);
    // Specific collision ignoring.
    //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
    var xform = this.getXform();
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        xform.incXPosBy(-1);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        xform.incXPosBy(1);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        this.getRigidBody().setVelocity(0, 100);
    }

    this.mRigidBody.setAngularVelocity(0);
    this.mRigidBody.update();
};

// Ignores collision with platform objects when the S key is pressed or
// when the hero is jumping from below the platform
Hero.prototype.ignoreCollision = function (obj) {
    if (obj instanceof Platform) {
        var heroBB = this.getBBox();
        var platformBB = obj.getBBox();
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
            return true;
        }
        
        if (this.getRigidBody().getVelocity()[1] < 0) {
            return false;
        }
        
        if (heroBB.minY() >= platformBB.maxY() - 0.5) {
            return false;
        }
               
        // This checks if the hero is moving upwards towards the platform when it collides.
        // we can tune these values to work better with our platform size
       // if (heroBB.minY() >= platformBB.maxY() - (platformBB.maxY() - platformBB.minY()) / 1.5) {
        //    return false;
        //a}
        
        // Since we checked for the case where we don't wanat to ignore collision, the fact
        // that we're still here means we DO want to ignore it.
        return true;
    }
     return false;
};