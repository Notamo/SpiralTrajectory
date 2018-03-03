/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, RigidShape, RigidRectangle,
 *       Platform, ArrowSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Hero(spriteTexture, physicsReference, cameraRef) {
    // Create the sprite
    this.mArcher = new SpriteRenderable(spriteTexture);
    this.mArcher.setColor([1, 1, 1, 0]);
    this.mArcher.getXform().setPosition(25, 1);
    this.mArcher.getXform().setSize(12, 12);
    this.mArcher.setElementPixelPositions(93, 403, 97, 440);
    GameObject.call(this, this.mArcher);
    
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
    
    this.mPhysicsSetRef = physicsReference;
    
    // ArrowVector is our "firing" mechanism, need a single instance.
    this.mArrowVector = new ArrowVector(cameraRef);
    
    this.mArrowSet = new ArrowSet();
    
    this.mNoClip = false;
    this.mUpdatesSinceClip = 0;
    this.mJumpCount = 0;
    this.mMaxJumps = 2;
    this.mArrowSelection = ArrowSet.eArrowType.eDefaultArrow;
};
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.setArrowSelection = function(type) {
    this.mArrowSelection = type;
};

Hero.prototype.getArrowSelection = function() {
    return this.mArrowSelection;
};
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
        if (this.mUpdatesSinceClip > 60) {
            this.mNoClip = false;
            this.mUpdatesSinceClip = 0;
        }
    }
    
    this.mArrowVector.update();
    
    // Arrow selction
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
        this.setArrowSelection(ArrowSet.eArrowType.eDefaultArrow);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
        this.setArrowSelection(ArrowSet.eArrowType.eFireArrow);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
        this.setArrowSelection(ArrowSet.eArrowType.eIceArrow);
    }
    if (gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)) {
        var arrow = new FireArrow(
            xform.getPosition(),
            this.mArrowVector.getPower(),
            this.mArrowVector.getDegrees()
        );
        var arrow = this.generateArrow();
        if (this.mArrowSet.addToSet(arrow)) {
            this.mPhysicsSetRef.addToSet(arrow);
        }
    }
    
    // Firing modes, should be moved to the Hero class as well.
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        this.mArrowVector.setFireMode(ArrowVectoWr.eFiringModes.eTailControl);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        this.mArrowVector.setFireMode(ArrowVector.eFiringModes.eHeadControl);
    }
    
    this.mArrowSet.update();
    this.mRigidBody.setAngularVelocity(0);
    this.mRigidBody.update();
};

Hero.prototype.generateArrow = function() {
    var arrow;
    var type = this.getArrowSelection();
    if (type == ArrowSet.eArrowType.eFireArrow) {
        arrow = new FireArrow(
            this.getXform().getPosition(),
            this.mArrowVector.getPower(),
            this.mArrowVector.getDegrees()
        );
    }
    else if (type == ArrowSet.eArrowType.eIceArrow) {
        arrow = new IceArrow(
            this.getXform().getPosition(),
            this.mArrowVector.getPower(),
            this.mArrowVector.getDegrees()
        );
    }
    else {
        arrow = new Arrow(
            this.getXform().getPosition(),
            this.mArrowVector.getPower(),
            this.mArrowVector.getDegrees()
        );
    }
    return arrow;
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
