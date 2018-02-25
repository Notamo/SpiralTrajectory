/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

//Smashing will be broken up later into these states
Boss.eSmashState = Object.freeze({
    eWindupState: 0,    //Raise arm
    eChargeState: 1,    //Charge up
    eSwingState: 2      //Swing Down!
})

Boss.prototype._smashStateInit = function() {    
    this.kSmashCooldownLength = 1;      //time before the boss can smash again
    this.kSmashChargeLength = .25;
    this.kLaunchMag = 100;
    
    this.mSmashCooldown = 0;
    this.mChargeTimer = this.kSmashChargeLength;
    this.mSmashTimer = this.kSmashLength;
    
    this.mCurrentSmashState = Boss.eSmashState.eWindupState;
};

//Smash State: Play smash animation, smash the player
Boss.prototype._serviceSmash = function(hero) {
    switch(this.mCurrentSmashState) {
        case Boss.eSmashState.eWindupState:
            this._serviceSmashWindup(hero);
            break;
        case Boss.eSmashState.eChargeState:
            this._serviceSmashCharge(hero);
            break;
        case Boss.eSmashState.eSwingState:
            this._serviceSmashDrop(hero);
            break;
    };
};

//Smash-Windup State: play the windup animation
//and then transition to Smash-Charge
Boss.prototype._serviceSmashWindup = function(hero) {
    if(this.mGolem.mCurrentElm >= 2)
        this.mCurrentSmashState = Boss.eSmashState.eChargeState;
};

//Smash-Charge State: interpolate texture to a reddish color
//The boss can be interrupted at this point?
Boss.prototype._serviceSmashCharge = function(hero) {
    
    //color interpolation goes here
    this.mGolem.setColor([1, 0, 0, .125]);
    //timer management
    if(this.mChargeTimer <= 0) {
        this.mCurrentSmashState = Boss.eSmashState.eSwingState;
        this.mChargeTimer = this.kSmashChargeLength;
    }
    this.mChargeTimer -= (1/60);
};

//Smash-Drop State: Play the drop animation
Boss.prototype._serviceSmashDrop = function(hero) {
    
    //the smash animation is done! do damage if possible
    if(this.mGolem.mCurrentElm >= this.mGolem.mNumElems - 1) {
        
        //if the player is still in range
        if(vec2.distance(hero.getXform().getPosition(), this.getXform().getPosition()) <= this.mSmashRange) {
            //send the player flying
            if(hero.getXform().getPosition()[0] - this.getXform().getPosition()[0] < 0)
                hero.getRigidBody().setVelocity(-this.kLaunchMag, this.kLaunchMag);
            else
                hero.getRigidBody().setVelocity(this.kLaunchMag, this.kLaunchMag);
        }
        
        this.mGolem.setColor([1, 1, 1, 0]);
        this._setupAnimation(Boss.eBossAnim.eIdleAnim, true);
        this.mSmashCooldown = this.kSmashCooldownLength;
        this.mCurrentSmashState = Boss.eSmashState.eWindupState;
        this.mCurrentState = Boss.eBossState.eChaseState;
        return;
    }
};
