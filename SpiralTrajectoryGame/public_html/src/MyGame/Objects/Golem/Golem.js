/* File: Golem.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, Arrow, Platform, Config,
 *       RigidSet, Interpolate */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Golem(sprite, heroRef, physicsGameObjectArrayRef, nonPhysicsGameObjectArrayRef) {
    // Save the reference to the game object sets.
    this.mPhysicsSetRef = physicsGameObjectArrayRef;
    this.mNonPhysicsSetRef = nonPhysicsGameObjectArrayRef;
    
    // Save a reference to the hero.
    this.mHero = heroRef;
    
    // References to torches.
    this.mTorches = [];

    // Setup the renderable
    this.mGolem = new SpriteAnimateRenderable(sprite);
    this.mGolem.setColor(Config.Golem.Properties.Color);
    this.mGolem.getXform().setPosition(
        Config.BossBattle.Boss.SpawnPosition.X,
        Config.BossBattle.Boss.SpawnPosition.Y
    );
    this.mGolem.getXform().setSize(
        Config.BossBattle.Boss.Size.Width,
        Config.BossBattle.Boss.Size.Height
    );
    GameObject.call(this, this.mGolem);
    
    this.setVisibility(false);
    
    // Interpolation
    this.mCenterX = new Interpolate(
        this.mGolem.getXform().getXPos(),
        Config.Golem.Properties.Interpolation.DefaultStiffness,
        Config.Golem.Properties.Interpolation.DefaultDuration
    );
    this.mCenterY = new Interpolate(
        this.mGolem.getXform().getYPos(),
        Config.Golem.Properties.Interpolation.DefaultStiffness,
        Config.Golem.Properties.Interpolation.DefaultDuration
    );
    
    // Physics
    this.mRigidSet = new RigidSet();
    this._buildRigidbodies();
    this.mFacing = Config.Golem.States.FacingLeft;
    
    // HP
    this.mMaxHP = Config.Golem.Properties.StartingHP;
    this.mCurrentHP = this.mMaxHP;
    this.mTorchBoost = 1.0;
    
    // State handling
    this.mCurrentState = Config.Golem.States.WaitingToSpawn;
    this.mCurrentStateInitialized = false;
    this.mIgnoreCollision = false;
    this.mCurrentProjectileState = null;
    this.mPreviousProjectileState = null;
    
    // Time tracking
    this.mStateStartTime = null;
    this.mMiscTracker = null;
    this.mTimeLastProjectileFired = null;
    
    // Stunned
    this.mStunned = false;
    this.mStunTimeRemaining = 0;
    this.mInterrupt = false;
}
gEngine.Core.inheritPrototype(Golem, GameObject);

Golem.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mRigidSet.draw(aCamera);
};

Golem.prototype.update = function () {
    if (this.mStunned === false) {
        this.updateState();
        this.calculateTorchBoost();
        this.mRigidBody.update();
        this.mRigidSet.update();
    } else {
        this.updateStun();
    }
};

Golem.prototype.hit = function (damage) {    
    this.mCurrentHP -= (damage * this.mTorchBoost);
    console.log(damage * this.mTorchBoost);
};

Golem.prototype.addTorchRef = function (torch) {
    this.mTorches.push(torch);
};

Golem.prototype.calculateTorchBoost = function () {
    this.mTorchBoost = 1.0;
    for (var i = 0; i < this.mTorches.length; i++) {
        this.mTorchBoost += this.mTorches[i].getBoost();
    }
};

Golem.prototype.interpolate = function () {
    this.mCenterX.updateInterpolation();
    this.mCenterY.updateInterpolation();
    this.mGolem.getXform().setXPos(this.mCenterX.getValue());
    this.mGolem.getXform().setYPos(this.mCenterY.getValue());
};

Golem.prototype.getCurrentState = function () {
    return this.mCurrentState;
};