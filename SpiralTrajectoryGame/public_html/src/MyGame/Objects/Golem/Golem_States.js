/* File: Golem_States.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

Golem.prototype.updateState = function () {
    switch (this.mCurrentState) {
        case Config.Golem.States.WaitingToSpawn:
            this._serviceWaitingToSpawn();
            break;
        case Config.Golem.States.Spawning:
            this._serviceSpawning();
            break;
        case Config.Golem.States.Idle:
            this._serviceIdle();
            break;
        case Config.Golem.States.Patrolling:
            this._servicePatrolling();
            break;
        case Config.Golem.States.Smashing:
            this._serviceSmashing();
            break;
        case Config.Golem.States.AttackingPlatform:
            this._serviceAttackingPlatform();
            break;
        case Config.Golem.States.Retreating:
            this._serviceRetreating();
            break;
        case Config.Golem.States.Dying:
            this._serviceDying();
            break;
        case Config.Golem.States.Dead:
            this._serviceDead();
            break;
        default: console.log('Invalid Golem state');
            break;
    }
};

Golem.prototype._serviceWaitingToSpawn = function () {
    // Initialize state.
    if (this.mCurrentStateInitialized === false) {
        // If the boss isn't spawned in we definitely don't want the
        // rigidbodies colliding with anything.
        if (this.mIgnoreCollision === false) {
            this.ignoreCollision();
            this.mIgnoreCollision = true;
        }
        
        this.setVisibility(false);
        this.mStateStartTime = Date.now();
        this.mCurrentStateInitialized = true;
    }
    
    // If the hero approaches the spawn location or an amount of time passes we
    // spawn the boss.
    if (vec2.distance(
            this.getXform().getPosition(), 
            this.mHero.getXform().getPosition()
        ) < Config.BossBattle.Boss.SpawnDistance || 
        Date.now() >= this.mStateStartTime + Config.BossBattle.Boss.MaxTimeBeforeSpawn) {
        this.mCurrentState = Config.Golem.States.Spawning;
        this.mCurrentStateInitialized = false;
    }
};

Golem.prototype._serviceSpawning = function () {
    // Initialize state.
    if (this.mCurrentStateInitialized === false) {
        // Don't want collisions as we spawn in.
        if (this.mIgnoreCollision === false) {
            this.ignoreCollision();
            this.mIgnoreCollision = true;
        }
        
        this.setVisibility(true);
        this._animate(Config.Golem.Animations.Spawn, true);
        this.mStateStartTime = Date.now();
        this.mCurrentStateInitialized = true;
    }
    
    // When spawning is complete we transition to the idle state.
    if (this._animationComplete()) {
        this.mMaxHP = Config.Golem.Properties.StartingHP;
        this.mCurrentHP = this.mMaxHP;
        this.mCurrentState = Config.Golem.States.Idle;
        this.mCurrentStateInitialized = false;
    }
    
    this.mGolem.updateAnimation();
};

Golem.prototype._serviceIdle = function () {
    // Initialize state.
    if (this.mCurrentStateInitialized === false) {
        // We want collisions if the boss is idle
        if (this.mIgnoreCollision === true) {
            this.allowCollision();
            this.mIgnoreCollision = false;
        }
        
        this.setVisibility(true);
        this._animate(Config.Golem.Animations.Idle, true);
        this.mStateStartTime = Date.now();
        this.mCurrentStateInitialized = true;
    } 
    
    // Begin patrolling after the boss takes damaage or some time passes.
    if (this.mCurrentHP < this.mMaxHP || 
        Date.now() >= this.mStateStartTime + Config.BossBattle.Boss.MaxTimeIdle) {
        this.mCurrentState = Config.Golem.States.Patrolling;
        this.mCurrentStateInitialized = false;
    }
    
    this.mGolem.updateAnimation();
};

Golem.prototype._servicePatrolling = function () {
    // Initialize state.
    if (this.mCurrentStateInitialized === false) {
        // We want collisions if the boss is idle
        if (this.mIgnoreCollision === true) {
            this.allowCollision();
            this.mIgnoreCollision = false;
        }
        
        this.setVisibility(true);
        this._animate(Config.Golem.Animations.Idle, true);
        this.mCenterX.configInterpolation(
            Config.Golem.States.Patrolling.Interpolation.Stiffness,
            Config.Golem.States.Patrolling.Interpolation.Duration
        );
        this.mCenterY.configInterpolation(
            Config.Golem.States.Patrolling.Interpolation.Stiffness,
            Config.Golem.States.Patrolling.Interpolation.Duration
        );
        this.mStateStartTime = Date.now();
        this.mMiscTracker = Date.now();
        this.xOffset = Config.Golem.States.Patrolling.Interpolation.XOffset;
        this.yOffset = Config.Golem.States.Patrolling.Interpolation.YOffset;
        this.mCurrentStateInitialized = true;
    }
    
    // Update behavior in current state.
    var golemXform = this.mGolem.getXform();
    var heroXform = this.mHero.getXform();
    if (Date.now() >= this.mMiscTracker + Config.Golem.States.Patrolling.Interpolation.Interval * Math.random()) {
        this.mMiscTracker = Date.now();
        if (Math.random() > 0.5) {
            this.yOffset *= -1;
        }
        if (Math.random() > 0.5) {
            this.xOffset *= -1;
        }
    }
    
    // X-position 
    if (golemXform.getXPos() - heroXform.getXPos() >= Config.Golem.States.Patrolling.MaxNonChaseXDistance) {
        this.xOffset = Math.abs(golemXform.getXPos() - heroXform.getXPos()) - Config.Golem.States.Patrolling.MaxNonChaseXDistance;
        this.xOffset *= -1;
    }
    
    if (heroXform.getXPos() - golemXform.getXPos() >= Config.Golem.States.Patrolling.MaxNonChaseXDistance) {
        this.xOffset = Math.abs(golemXform.getXPos() - heroXform.getXPos()) - Config.Golem.States.Patrolling.MaxNonChaseXDistance;        
    }
    
    // Y-position
    if (heroXform.getYPos() > golemXform.getYPos() && 
        Math.random() < Config.Golem.States.Patrolling.ChanceToChaseHeroYPos * heroXform.getYPos() / golemXform.getYPos() &&
        this.yOffset <= 0) {
        this.yOffset *= -1;
    }
    if (heroXform.getYPos() < golemXform.getYPos() && 
        Math.random() < Config.Golem.States.Patrolling.ChanceToChaseHeroYPos * golemXform.getYPos() / heroXform.getYPos() &&
        this.yOffset >= 0) {
        this.yOffset *= -1;
    }
    
    if (this.mCenterY.getValue() <= Config.Golem.States.Patrolling.MinHeight && this.yOffset < 0) {
        this.yOffset *= -1;
    }
    
    if (this.mCenterY.getValue() >= Config.Golem.States.Patrolling.MaxHeight && this.yOffset > 0) {
        this.yOffset *= -1;
    }

    this.mCenterX.setFinalValue(golemXform.getXPos() + this.xOffset);
    this.mCenterY.setFinalValue(golemXform.getYPos() + this.yOffset);
    
    // Conditions to transition to other states.
    
    this.interpolate();
    this.mGolem.updateAnimation();
};

Golem.prototype._serviceSmashing = function () {
    
};

Golem.prototype._serviceAttackingPlatform = function () {
    
};

Golem.prototype._serviceRetreating = function () {
    
};

Golem.prototype._serviceDying = function () {
    
};

Golem.prototype._serviceDead = function () {
    
};