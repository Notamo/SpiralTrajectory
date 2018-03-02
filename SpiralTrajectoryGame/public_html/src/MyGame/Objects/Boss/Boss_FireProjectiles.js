/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

//states for firing projectiles
Boss.eFireProjState = Object.freeze({
   eWarmupState: 0,         //Warm up to firing
   eBurstState: 1,           //Fire some missiles
   eDelayState: 2,          //wait for next FireState
   eCooldownState: 3        //cool down to next primary state
});


Boss.prototype._fireProjectilesInit = function(projectileTexture) {
  this.kProjTex = projectileTexture;
  
  //bursts
  this.kNumBursts = 3;          //number of bursts
  this.mBurstCount = 0;         //the burst we're on
  
  this.kBurstSize = 5;          //number of projectiles to fire in each burst
  this.mShotCount = 0;          //the number of shots in the current burst
  
  //shots
  this.kShotDelay = 10;         //frames between each shot
  this.mShotDelayFrame = 0;     //curent frame waiting for next shot
  
  //Delay State
  this.kBurstDelay = 30;        //frames between each burst
  this.kBurstDelayFrame = 0;    //current frame waiting for next burst
  

  
  this.bossProjectiles = new GameObjectSet();
  this.mFireProjState = Boss.eFireProjState.eWarmupState;
};

Boss.prototype._serviceFireProjState = function() {
    switch(this.mFireProjectilesState)
    {
        case Boss.eFireProjState.eWarmupState:
            this._serviceFireProjWarmupState();
            break;
        case Boss.eFireProjState.eBurstState:
            this._serviceFireProjBurstState();
            break;
        case Boss.eFireProjState.eDelayState:
            this._serviceFireProjDelayState();
            break;
        case Boss.eFireProjState.eCooldownState:
            this._serviceFireProjCooldownState();
            break;
    }
};

Boss.prototype._serviceFireProjWarmupState = function() {
    //no wawrmup for now
    this.mFireProjState = Boss.eFireProjState.eFireState;
};

Boss.prototype._serviceFireProjBurstState = function() {
    
    if(this.mShotDelayFrame === 0) {
        //make a shot
        console.log("Fire Projectile!");
        this.mShotCount++;
        
        //check if we've fired all the shots in the burst
        if(this.mShotCount === this.kBurstSize) {
            this.mShotCount = 0;
            this.mShotDelayFrame = 0;
            this.mBurstCount++;
            
            //if this is our last burst
            if(this.mBurstCount === this.kNumBursts){
                //move to the cooldown state
                this.mBurstCount = 0;
                this.mFireProjState = Boss.eFireProjState.eCooldownState;
                console.log("moving to cooldown state");
                return;
            }
            else {  //otherwise
                //move to the delay state
                this.mFireProjState = Boss.eFireProjState.eDelayState;
                console.log("moving to delay state");
                return;
            }
        }
    }
    
    if(this.mShotDelayFrame === this.kShotDelay) {
        this.mShotDelayFrame = 0;
    }
    
    this.mShotDelayFrame++;
};

Boss.prototype._serviceFireProjDelayState = function() {
    
    if(this.mBurstDelayFrame === this.kBurstDelay) {
        this.mBurstDelayFrame = 0;
        this.mFireProjState = Boss.eFireProjState.eBurstState;
        return;
    }
        
    this.mBurstDelayFrame++;
}

Boss.prototype._serviceFireProjCooldownState = function() {
    //no cooldown for now
    this.mFireProjState = Boss.eFireProjState.eWarmupState;
    this.mCurrentState = Boss.eBossState.eChaseState;
};


Boss.prototpye._fireProjectile = function() {
    console.log("Firing Projectile!");
}