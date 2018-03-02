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

function Hero(spriteTexture, physicsReference, cameraRef) {
    // Create the sprite
    this.mArcher = new SpriteRenderable(spriteTexture);
    this.mArcher.setColor([1, 1, 1, 0]);
    this.mArcher.getXform().setPosition(0, 0);
    this.mArcher.getXform().setSize(12, 12);
    this.mArcher.setElementPixelPositions(93, 403, 97, 440);
    GameObject.call(this, this.mArcher);
    
    // ArrowVector
    this.cArrowVectorMaxLength = 30;
    
    // Physics
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getWidth() / 2,
        this.getXform().getHeight() / 1.07
    );
    r.setMass(10);
    r.setRestitution(1);
    r.setFriction(1);  
    this.setRigidBody(r);
    // Specific collision ignoring.
    //this.toggleDrawRigidShape();
    
    this.mPhysicsSetRef = physicsReference;
    
    // ArrowVector is our "firing" mechanism, need a single instance.
    this.mArrowVector = new ArrowVector(
        this.cArrowVectorMaxLength, 
        cameraRef);
    
    this.mArrowSet = new ArrowSet();
    
    this.mNoClip = false;
    this.mUpdatesSinceClip = 0;
    this.mJumpCount = 0;
    this.mMaxJumps = 2;
};
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.draw = function(aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    //super.draw(aCamera);
    this.mArrowVector.draw(aCamera);
    this.mArrowSet.draw(aCamera);

};

Hero.prototype.update = function () {
    var xform = this.getXform();
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        this.getRigidBody().adjustPositionBy([-10,0], .1);
        this.getXform().setOrientation(-1);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.getRigidBody().adjustPositionBy([10,0], .1);
        this.getXform().setOrientation(1);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        if (this.mJumpCount < this.mMaxJumps) {
            this.getRigidBody().setVelocity(0,100);
            this.mJumpCount++;
        }
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        this.mNoClip = true;
        this.mUpdatesSinceClip = 0;
    }
    else {
        if (this.mNoClip) {
            this.mUpdatesSinceClip++;
        }
        if (this.mUpdatesSinceClip > 20) {
            this.mNoClip = false;
            this.mUpdatesSinceClip = 0;
        }
    }
    
    this.mArrowVector.update();
    if (gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)) {
        var arrow = new Arrow(
            xform.getPosition(),
            this.mArrowVector.getPower(),
            this.mArrowVector.getDegrees()
        );
        if (this.mArrowSet.addToSet(arrow)) {
            this.mPhysicsSetRef.addToSet(arrow);
        }
    }
    
    // Firing modes, should be moved to the Hero class as well.
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
        this.mArrowVector.setFireMode(ArrowVectoWr.eFiringModes.eTailControl);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
        this.mArrowVector.setFireMode(ArrowVector.eFiringModes.eHeadControl);
    }
    
    this.mArrowSet.update();
    this.mRigidBody.setAngularVelocity(0);
    this.mRigidBody.update();
};

// Ignores collision with platform objects when the S key is pressed or
// when the hero is jumping from below the platform
Hero.prototype.userCollisionHandling = function (obj) {
    
    if (obj instanceof Platform) {
        // NoClip is our setting for indicating the Hero is in a state which should avoid
        // collisions with platforms. If it's true, return true.
        if (this.mNoClip) {
            return true;
        }    
        
        // NoClip might be false
        if (this.getRigidBody().getVelocity()[1] < 0) {
            this.mJumpCount = 0;
            return false;
        }
        
        // Since we checked for the case where we don't wanat to ignore collision, the fact
        // that we're still here means we DO want to ignore it.
        return true;
    }
    
    this.mJumpCount = 0;
    
     return false;
};