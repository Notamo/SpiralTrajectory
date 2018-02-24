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
    eInactiveState: 0,      //Inactive/not visible
    eSpawnState: 1,         //currently spawning in
    eIdleState: 2,          //not doing anything, unaware of player
    eChaseState: 3,         //player too far to attack, chasing player
    eSmashState: 4          //In range, Smash the player!
});

function Boss(bossSprite, hero) {
    this.kBossSprite = bossSprite;
    
    this.mGolem = new SpriteAnimateRenderable(this.kBossSprite);
    this.mGolem.setColor([1, 1, 1, 0]);
    this.mGolem.getXform().setPosition(100, -30);
    this.mGolem.getXform().setSize(52, 34);

    this._setupAnimation(Boss.eBossAnim.eIdleAnim, true);
    GameObject.call(this, this.mGolem);
  
    //Set up the rigidbody
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getWidth() * .4,
        this.getXform().getHeight()
    );
    r.setMass(1000);
    r.setRestitution(1);
    r.setFriction(0);  
    this.setRigidBody(r);
    this.toggleDrawRigidShape();
    
    //the hero
    this.mHero = hero;
    
    //State support
    this.mAggroRange = 60;       //how close the player needs to be to aggro
    //Chase State Support
    this.mChaseSpeed = .5;
    this.mSmashRange = 30;       //how close the golem needs to be to the player to smash
    //Smash State Support
    this._smashStateInit();

    this.mCurrentState = Boss.eBossState.eIdleState;
}
gEngine.Core.inheritPrototype(Boss, GameObject);

Boss.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mGolem.draw(aCamera);
};

Boss.prototype.update = function () {
    switch(this.mCurrentState) {
        case Boss.eBossState.eIdleState:
            this._serviceIdle(this.mHero);
            break;
        case Boss.eBossState.eChaseState:
            this._serviceChase(this.mHero);
            break;
        case Boss.eBossState.eSmashState:
            this._serviceSmash(this.mHero);
            break;
    }
    
    //orient the boss to face the player at all times
    if(Math.sign(this.mHero.getXform().getPosition()[0] - this.mGolem.getXform().getPosition()[0]) <= 0)
        this.mGolem.getXform().setOrientation(1);
    else
        this.mGolem.getXform().setOrientation(-1);
    
    this.getRigidBody().update();
    this.mGolem.updateAnimation();
};

//Idle State: play idle animation
//Wait for player in aggro range
Boss.prototype._serviceIdle = function(hero) {
    var bossPos = this.getXform().getPosition();
    var heroPos = hero.getXform().getPosition();

    //If the player gets in aggro range of the boss
    //the boss becomes active
    if(vec2.distance(bossPos, heroPos) <= this.mAggroRange) {
        this.mCurrentState = Boss.eBossState.eChaseState;
        this._setupAnimation(Boss.eBossAnim.eIdleAnim, true);
        return;
    }
};

//Aggro State: Chase player
Boss.prototype._serviceChase = function(hero) {
    var heroPos = hero.getXform().getPosition();
    var bossPos = this.getXform().getPosition();

    
    //if the player is in smashing range, stop and fgo to smash State
    if(vec2.distance(bossPos, heroPos) <= this.mSmashRange) {
        console.log("Smashing...");
        this.mCurrentState = Boss.eBossState.eSmashState;
        this.getRigidBody().setVelocity(0, 0);                  //stop motion to attack

        this._setupAnimation(Boss.eBossAnim.eSmashAnim, true);
        return;
    }
    
    //move towards the player at this.mChaseSpeed
    var chaseVel = vec2.fromValues(0, 0);
    vec2.subtract(chaseVel, heroPos, bossPos);
    vec2.normalize(chaseVel, chaseVel);
    vec2.scale(chaseVel, chaseVel, this.mChaseSpeed * vec2.distance(heroPos, bossPos));
    
    this.getRigidBody().setVelocity(chaseVel[0], 0);
};

