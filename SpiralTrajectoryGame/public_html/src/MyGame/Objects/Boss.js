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

Boss.eBossState = Object.freeze({
    eInactiveState: 0,      //not doing anything, unaware of player
    eChaseState: 1,         //player too far to attack, chasing player
    eSmashState: 2          //In range, Smash the player!
});

function Boss(spriteTexture, hero) {
    this.kDelta = 0.3;

    this.mGolem = new SpriteRenderable(spriteTexture);
    this.mGolem.setColor([1, 1, 1, 0]);
    this.mGolem.getXform().setPosition(100, -30);
    this.mGolem.getXform().setSize(30, 30);
    this.mGolem.setElementPixelPositions(24, 485, 70, 440);
    GameObject.call(this, this.mGolem);
    
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getWidth(),
        this.getXform().getHeight() / 1.07
    );
    r.setMass(1000);
    r.setRestitution(1);
    r.setFriction(0);  
    this.setRigidBody(r);
    this.toggleDrawRigidShape();
    
    //the hero
    this.mHero = hero;
    
    //State support
    this.mAggroRange = 50;       //how close the player needs to be to aggro
    this.mSmashRange = 25;       //how close the golem needs to be to the player to smash
    
    //Chase State Support
    this.mChaseSpeed = 20;
    
    //Smash State Support
    this.kSmashLength = 1;
    this.mSmashTimer = 1;
    
    this.mCurrentState = Boss.eBossState.eInactiveState;
}
gEngine.Core.inheritPrototype(Boss, GameObject);

Boss.prototype.update = function () {
    switch(this.mCurrentState) {
        case Boss.eBossState.eInactiveState:
            this._serviceInactive(this.mHero);
            break;
        case Boss.eBossState.eChaseState:
            this._serviceChase(this.mHero);
            break;
        case Boss.eBossState.eSmashState:
            this._serviceSmash(this.mHero);
            break;
    }
    
    //console.log(this.getXform().getPosition());
    this.getRigidBody().update();
};

//Inactive State: play idle animation

Boss.prototype._serviceInactive = function(hero) {
    var bossPos = this.getXform().getPosition();
    var heroPos = hero.getXform().getPosition();

    //If the player gets in aggro range of the boss
    //the boss becomes active
    if(vec2.distance(bossPos, heroPos) <= this.mAggroRange) {
        
        this.mCurrentState = Boss.eBossState.eChaseState;
        return;
    }
    
    //continue to play Idle animation
};

//Aggro State: Chase player
Boss.prototype._serviceChase = function(hero) {
    var heroPos = hero.getXform().getPosition();
    var bossPos = this.getXform().getPosition();
    
        //if the player is in smashing range, stop and fgo to smash State
    if(vec2.distance(bossPos, heroPos) <= this.mSmashRange) {
        this.mCurrentState = Boss.eBossState.eSmashState;
        this.getRigidBody().setVelocity(0, 0);
        console.log("Smashing...");
        return;
    }
    
    //move towards the player at this.mChaseSpeed
    var chaseVel = vec2.fromValues(0, 0);
    vec2.subtract(chaseVel, heroPos, bossPos);
    vec2.normalize(chaseVel, chaseVel);
    vec2.scale(chaseVel, chaseVel, this.mChaseSpeed);
    
    this.getRigidBody().setVelocity(chaseVel[0], 0);
};

//Smash State: Play smash animation, smash the player
Boss.prototype._serviceSmash = function(hero) {
    //run the smash animation
    //no animation yet, so just run a timer
    this.mSmashTimer -= (1/60);
    
    if(this.mSmashTimer <= 0){
        console.log("SMASH!!!");
        this.mSmashTimer = this.kSmashLength;
        this.mCurrentState = Boss.eBossState.eChaseState;
    }
};