/* File: Golem_Combat.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

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
    
    // Transition to other states.
    if (this.mCurrentHP <= 0) {
        this.mCurrentState = Config.Golem.States.Dying;
        this.mCurrentStateInitialized = false;
    } else if (this.mCurrentHP < this.mMaxHP || 
        Date.now() >= this.mStateStartTime + Config.BossBattle.Boss.MaxTimeIdle) {
        this.mCurrentState = Config.Golem.States.Patrolling;
        this.mCurrentStateInitialized = false;
    }
    
    if (this.mCurrentHP <= 0) {
        this.mCurrentState = Config.Golem.States.Dying;
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
    
    // Have the boss face the hero
    if (heroXform.getXPos() < golemXform.getXPos() && 
        this.mFacing === Config.Golem.States.FacingRight) {
        this.switchDirection();
    } else if (heroXform.getXPos() > golemXform.getXPos() &&
        this.mFacing === Config.Golem.States.FacingLeft) {
        this.switchDirection();
    }
    
    // Projectile firing
    if (this.mCurrentProjectileState === null) {
        if (this.mTimeLastProjectileFired === null || 
            Date.now() >= this.mTimeLastProjectileFired + Config.Golem.States.Patrolling.ProjectileFiringInterval) {
            var nextProjectile = Math.random();
            if (nextProjectile < Config.Golem.Projectiles.Salvo.Chance) {
                this.mCurrentProjectileState = Config.Golem.Projectiles.Salvo;
            } else if (nextProjectile < Config.Golem.Projectiles.Burst.Chance) {
                this.mCurrentProjectileState = Config.Golem.Projectiles.Burst;
            } else {
                this.mCurrentProjectileState = Config.Golem.Projectiles.Blast;
            }
        }
    } else {
        // Projectile attack in progress, do appropriate things.
        this._updateProjectileState();
    }

    // Conditions to transition to other states.
    if (this.mCurrentHP <= 0) {
        this.mCurrentState = Config.Golem.States.Dying;
        this.mCurrentStateInitialized = false;
    }
    this.interpolate();
    this.mGolem.updateAnimation();
};

Golem.prototype._serviceSmashing = function () {
    
};

Golem.prototype._serviceAttackingPlatform = function () {
    
};

Golem.prototype._serviceRetreating = function () {
    
};