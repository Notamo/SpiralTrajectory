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

function Arrow(position, power,degree) {
    // Create the sprite
    this.mArcher = new TextureRenderable("assets/projectiles/arrow.png");
    this.mArcher.setColor([1, 1, 1, 0]);
    this.mArcher.getXform().setPosition(position[0]+5, position[1]);
    this.mArcher.getXform().setSize(2/1.5, 12/1.5);
    this.move=false;
    this.power=power*1.8;
    this.degree=degree;
    this.mArcher.getXform().incRotationByDegree(degree-90);
    GameObject.call(this, this.mArcher);
    
    // Physics
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getWidth(),
        this.getXform().getHeight()
    );
    r.setMass(1);
    r.setRestitution(1);
    r.setFriction(1);  
    this.setRigidBody(r);
    //finds how much velocity is needed for both x and y
    var x=this.degree*(Math.PI/180);
    var y=this.degree*(Math.PI/180);
    x=Math.cos(x);
    y=Math.sin(y);
    this.getRigidBody().setVelocity(x*this.power, y*this.power);
    
    //this.mDegree = new Interpolate((this.degree-90)*(Math.PI/180), 600, .05);
    // Specific collision ignoring.
    //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Arrow, GameObject);

Arrow.prototype.update = function () {
    var xform = this.mArcher.getXform();
    var vel = this.getRigidBody().getVelocity();
    if (vel[0] >0) {
        xform.setRotationInRad(Math.atan(vel[1]/(vel[0] + .0001)) - Math.PI/2);
    }
    else {
        xform.setRotationInRad(Math.atan(vel[1]/(vel[0] + .0001)) + Math.PI/2);
    }
    //this.mRigidBody.setAngularVelocity(-1);
    this.mRigidBody.update();
};

Arrow.prototype.draw = function (mCamera) {
    this.mArcher.draw(mCamera);
    this.mRigidBody.draw(mCamera);
};

Arrow.prototype.getPosition = function(){
    return this.mArcher.getXform().getPosition();
};
