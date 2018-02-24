/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

//Smashing will be broken up later into these states
Boss.eStateSmash = Object.freeze({
    eWarmupState: 0,    //Raise arm
    eChargeState: 1,    //Charge up
    eSwingState: 2      //Swing Down!
})

Boss.prototype._smashStateInit = function() {
    this.kSmashLength = .5;
    this.kSmashWarmupLength = 1;
    this.kSmashCooldownLength = 2;
    
    this.mSmashTimer = this.kSmashLength;
};

//Smash State: Play smash animation, smash the player
Boss.prototype._serviceSmash = function(hero) {
    //run the smash animation
    if(this.mSmashTimer <= 0){
        console.log("SMASH!!!");
        this.mSmashTimer = this.kSmashLength;
        
        //if the player is still in range
        if(vec2.distance(hero.getXform().getPosition(), this.getXform().getPosition()) <= this.mSmashRange) {
            //send the player flying
            if(hero.getXform().getPosition()[0] - this.getXform().getPosition()[0] < 0)
                hero.getRigidBody().setVelocity(-50, 50);
            else
                hero.getRigidBody().setVelocity(50, 50);
        }
        this.mGolem.setTexture(this.kIdleSprite);
        this.mCurrentState = Boss.eBossState.eChaseState;
        
        return;
    }
    
    this.mSmashTimer -= (1/60);
};
