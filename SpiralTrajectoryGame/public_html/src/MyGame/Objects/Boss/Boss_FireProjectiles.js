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
  this.kFireTellColor = [1, 0, 1, .25];
  
  //range
  this.kMinProjRange = 60;      //minimum range to fire projectiles
  this.kMaxProjRange = 200;     //maximum fire projectiles range
  //Warmup/"Tell"
  this.kWarmupLength = 1;       
  this.mWarmupTime = 0;
  //Cooldown
  this.kFireProjCooldownLength = 3;     //time before the boss can fire again (seconds)
  this.mFireProjCooldown = 0;

  //bursts
  this.kNumBursts = 3;          //number of bursts
  this.mBurstCount = 0;         //the burst we're on
  
  this.kBurstSize = 5;          //number of projectiles to fire in each burst
  this.mShotCount = 0;          //the number of shots in the current burst
  
  //shots
  this.kShotDelay = 5;         //frames between each shot
  this.mShotDelayFrame = 0;     //curent frame waiting for next shot
  
  //Delay State
  this.kBurstDelay = 30;        //frames between each burst
  this.mBurstDelayFrame = 0;    //current frame waiting for next burst
  

  //Firing parameters
  this.kRelLaunchPos = vec2.fromValues(0, 15);
  this.mBaseFireDir = vec2.fromValues(1, 1);
  this.mXFireSpread = .1;
  this.mYFireSpread = 1;
  this.kFireSpeed = 10;
  
  
  this.mBossProjSet = new GameObjectSet();
  this.mFireProjState = Boss.eFireProjState.eWarmupState;
};

Boss.prototype._drawProjectiles = function(aCamera) {
    this.mBossProjSet.draw(aCamera);
};

Boss.prototype._updateProjectiles = function() {
    this.mBossProjSet.update();
}

Boss.prototype._serviceFireProj = function() {
    
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
    
    //tell for now is a color
    this.mGolem.setColor(this.kFireTellColor);
    
    if(this.mWarmupTime > this.kWarmupLength) {
        this.mFireProjState = Boss.eFireProjState.eBurstState;
        this.mWarmupTime = 0;
        return;
    }
    this.mWarmupTime += (1/60);
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

                this.mGolem.setColor([1, 1, 1, 0]);
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
};


Boss.prototype._fireProjectile = function() {
    var launchPos = vec2.fromValues(0, 0);
    vec2.add(launchPos, this.kRelLaunchPos, this.getXform().getPosition());
    
    //make a random launch direction
    var offset = vec2.fromValues(this.mXFireSpread * Math.random() - this.mXFireSpread/2, this.mYFireSpread * Math.random()  - this.mYFireSpread/2);
    
    var launchDir = vec2.fromValues(0, 0);
    vec2.add(launchDir, this.mBaseFireDir, offset);
    
    launchDir[0] *= -this.getXform().getOrientation();
    vec2.normalize(launchDir, launchDir);
    
    //Make the projectile
    var newProjectile = new BossProjectile(this.kProjSprite, 
                                    this.mHero, 
                                    launchPos, 
                                    launchDir, 
                                    this.kFireSpeed);
    
    this.mBossProjSet.addToSet(newProjectile);
    this.mPhysicsSetRef.addToSet(newProjectile);
};

