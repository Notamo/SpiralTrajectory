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
});


Boss.prototype._fireProjectilesInit = function(projectileSprite) {
  this.kProjSprite = projectileSprite;
  
  //range
  this.kMinProjRange = 60;      //minimum range to fire projectiles
  this.kMaxProjRange = 200;     //maximum fire projectiles range
  //Cooldown
  this.kFireProjCooldownLength = 3;     //time before the boss can fire again (seconds)
  this.mFireProjCooldown = 0;
  
  
  
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
  this.mBurstDelayFrame = 0;    //current frame waiting for next burst
  

  
  this.bossProjSet = new GameObjectSet();
  this.mFireProjState = Boss.eFireProjState.eWarmupState;
};

Boss.prototype._drawProjectiles = function(aCamera) {
    this.bossProjSet.draw(aCamera);
};

Boss.prototype._updateProjectiles = function() {
    this.bossProjSet.update();
    //if(this.bossProjSet.size() > 0)
      //  console.log(this.bossProjSet.size() + " Boss Projectiles");
}

Boss.prototype._serviceFireProj = function() {
    
    //console.log("_serviceFireProj");
    switch(this.mFireProjState)
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
    }
    
    
};

Boss.prototype._serviceFireProjWarmupState = function() {
    //no wawrmup for now
    this.mFireProjState = Boss.eFireProjState.eBurstState;
};

Boss.prototype._serviceFireProjBurstState = function() {
    //console.log("BurstState");
    if(this.mShotDelayFrame === 0) {
        //make a shot
        this._fireProjectile();
        this.mShotCount++;
        
        //check if we've fired all the shots in the burst
        if(this.mShotCount === this.kBurstSize) {
            this.mShotCount = 0;
            this.mShotDelayFrame = 0;
            this.mBurstCount++;
            
            //if this is our last burst
            if(this.mBurstCount === this.kNumBursts){
                //move to chase state
                this.mBurstCount = 0;
                this.mFireProjState = Boss.eFireProjState.eWarmupState;
                this.mCurrentState = Boss.eBossState.eChaseState;
                console.log("moving to chase state");
                return;
            }
            else {  //otherwise
                //move to the delay state
                this.mFireProjState = Boss.eFireProjState.eDelayState;
                return;
            }
        }
    }
    
    if(this.mShotDelayFrame === this.kShotDelay) {
        this.mShotDelayFrame = 0;
    } 
    else {    
        this.mShotDelayFrame++;
    }
};

Boss.prototype._serviceFireProjDelayState = function() {
    if(this.mBurstDelayFrame === this.kBurstDelay) {
        this.mBurstDelayFrame = 0;
        this.mFireProjState = Boss.eFireProjState.eBurstState;
        return;
    }
        
    this.mBurstDelayFrame++;
}


Boss.prototype._fireProjectile = function() {
    console.log("Firing Projectile!");
    var newProjectile = new BossProjectile(this.kProjSprite, this.mHero, this.getXform().getPosition(), 0);
    this.bossProjSet.addToSet(newProjectile);
}