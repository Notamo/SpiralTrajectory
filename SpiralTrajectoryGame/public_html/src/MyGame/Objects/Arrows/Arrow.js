/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, vec2, RigidShape, RigidRectangle,
 *       Platform */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Arrow(position,power,degree) {
    // Create the sprite
    this.mArrow = new TextureRenderable("assets/projectiles/icearrow.png");
    this.mArrow.setColor([1, 1, 1, 0]);
    this.mArrow.getXform().setPosition(position[0], position[1]);
    this.mArrow.getXform().setSize(2/1.5, 12/1.5);
    this.power=power;
    this.degree=degree;
    this.mArrow.getXform().incRotationByDegree(degree+270);
    GameObject.call(this, this.mArrow);
    
    this.kBasePower = 180;
    this.mTimeSinceSpawn = 0;
    this.mExpired=false;
    this.mCollided = false;
    
    // Physics
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getWidth()*.8,
        this.getXform().getHeight()
    );
    r.setMass(2);
    r.setRestitution(.8);
    r.setFriction(1);  
    this.setRigidBody(r);
    var x=this.degree*(Math.PI/180);
    var y=this.degree*(Math.PI/180);
    x=Math.cos(x);
    y=Math.sin(y);
    this.getRigidBody().setVelocity(x*this.power* this.kBasePower, y*this.power* this.kBasePower);
    // Specific collision ignoring.
    //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Arrow, GameObject);

Arrow.prototype.getTimeAlive = function () {
    return this.mTimeSinceSpawn;
};

Arrow.prototype.update = function () {
    this.mTimeSinceSpawn++;
    var xform = this.mArrow.getXform();
    var vel = this.getRigidBody().getVelocity();
    if(!this.getCollided()){
        if (vel[0] >0) {
            xform.setRotationInRad(Math.atan(vel[1]/(vel[0] + .0001)) - Math.PI/2);
        }
        else {
            xform.setRotationInRad(Math.atan(vel[1]/(vel[0] + .0001)) + Math.PI/2);
        }
    }
    if(this.mTimeSinceSpawn >600){
        this.mExpired===true;
    }
    if(this.mCollided===true) {
        this.mRigidBody.setFriction(1);
    }
    this.mRigidBody.update();

};

Arrow.prototype.getPosition = function(){
    return this.mArrow.getXform().getPosition();
};

Arrow.prototype.setExpired = function(value){
    this.mExpired = value;
};

Arrow.prototype.setCollided = function(value) {
    this.mCollided = value;
};

Arrow.prototype.getCollided = function() {
    return this.mCollided;
};

Arrow.prototype.getExpired = function(){
    return this.mExpired;
};

Arrow.prototype.userCollisionHandling = function(obj){
    if(obj instanceof Arrow){
        return true;
    }
    
    if (obj instanceof Hero) {
        if (this.getTimeAlive() < 30 || this.mCollided) {
            return true;
        }
    }
    if (obj instanceof Boss && this.mCollided) {
        return true;
        
    }
    this.setCollided(true);
    return false;
};