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
    this.mArcher = new TextureRenderable("assets/projectiles/arrow.png");
    this.mArcher.setColor([1, 1, 1, 0]);
    this.mArcher.getXform().setPosition(position[0], position[1]);
    this.mArcher.getXform().setSize(2/1.5, 12/1.5);
    this.power=power;
    this.degree=degree;
    this.mArcher.getXform().incRotationByDegree(degree+270);
    GameObject.call(this, this.mArcher);
    
    this.kBasePower = 180;
    this.mTimeSinceSpawn = 0;
    this.isDead=false;
    this.hasCollided = false;
    
    // Physics
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getWidth(),
        this.getXform().getHeight()
    );
    r.setMass(2);
    r.setRestitution(.2);
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
}

Arrow.prototype.update = function () {
    this.mTimeSinceSpawn++;
    var xform = this.mArcher.getXform();
    var vel = this.getRigidBody().getVelocity();
    if(this.hasCollided === false){
        if (vel[0] >0) {
            xform.setRotationInRad(Math.atan(vel[1]/(vel[0] + .0001)) - Math.PI/2);
        }
        else {
            xform.setRotationInRad(Math.atan(vel[1]/(vel[0] + .0001)) + Math.PI/2);
        }
    }
    if(this.mTimeSinceSpawn >600){
        this.isDead===true;
    }
    if(this.hasCollided===true) {
        this.mRigidBody.setFriction(1);
    }
    this.mRigidBody.update();

};

Arrow.prototype.getPosition = function(){
    return this.mArcher.getXform().getPosition();
};

Arrow.prototype.setDeath = function(dead){
    this.isDead=dead;
};

Arrow.prototype.setCollided = function(value) {
    this.hasCollided = value;
//    if (value === true) {
//        this.mRigidBody.setFriction(1);
//    }
};

Arrow.prototype.getDeath = function(){
    return this.isDead;
};

Arrow.prototype.userCollisionHandling = function(obj){
    if(obj instanceof Arrow){
        return true;
    }
    
    if (obj instanceof Hero) {
        if (this.getTimeAlive() < 30) {
            return true;
        }
    }
    this.setCollided(true);
    return false;
};