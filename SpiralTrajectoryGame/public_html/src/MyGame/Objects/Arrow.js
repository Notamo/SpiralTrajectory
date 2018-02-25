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

function Arrow(power,degree) {
    // Create the sprite
    this.mArcher = new TextureRenderable("assets/projectiles/arrow.png");
    this.mArcher.setColor([1, 1, 1, 0]);
    this.mArcher.getXform().setPosition(-10, -10);
    this.mArcher.getXform().setSize(2/1.5, 12/1.5);
    this.move=false;
    this.power=power;
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
    r.setFriction(0);  
    this.setRigidBody(r);
    //finds how much velocity is needed for both x and y
    var x=this.degree*(Math.PI/180);
    var y=this.degree*(Math.PI/180);
    x=Math.cos(x);
    y=Math.sin(y);
    this.getRigidBody().setVelocity(x*this.power, y*this.power);
    // Specific collision ignoring.
    //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Arrow, GameObject);

Arrow.prototype.update = function () {
    var xform = this.mArcher.getXform();
    //Part to fix: direction of arrow and orientation needs work
    if(this.getRigidBody().getVelocity()[1]!==0 && xform.getRotationInDegree()>180 && Math.cos(this.degree)>0){
        this.mRigidBody.setAngularVelocity(0);
     xform.setRotationInDegree(this.degree*(this.getRigidBody().getVelocity()[1]/100)+270);
    }
    else if(this.getRigidBody().getVelocity()[1]!==0 && xform.getRotationInDegree()<180 && Math.cos(this.degree)<=0){
    this.mRigidBody.setAngularVelocity(1);
    }
    //this.mRigidBody.setAngularVelocity(-1);
    this.mRigidBody.update();
};

Arrow.prototype.draw = function (mCamera) {
    this.mArcher.draw(mCamera);
    this.mRigidBody.draw(mCamera);
};
