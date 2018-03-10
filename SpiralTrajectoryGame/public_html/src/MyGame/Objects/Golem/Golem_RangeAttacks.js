/* File: Golem_RangeAttacks.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem, GolemBlastProjectile */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Update function for the projectile firing system. Selects
 * a specific update function based on the current state.
 * 
 * @returns {undefined}
 */
Golem.prototype._updateProjectileState = function () {
    switch (this.mCurrentProjectileState) {
        case Config.Golem.Projectiles.Salvo:
            this._updateProjectileSalvo();
            break;
        case Config.Golem.Projectiles.Burst:
            this._updateProjectileBurst();
            break;
        case Config.Golem.Projectiles.Blast:
            this._updateProjectileBlast();
            break;
        default:
            console.log("Golem._updateProjectileState called without Golem having a current projectile state.");
    }
};

/**
 * Update for the Salvo projectile state. This is extremely straightforward.
 * Salvo is a fire-and-forget projectile attack, so we just fire off the Salvo
 * and exit our projectile state.
 * 
 * @returns {undefined}
 */
Golem.prototype._updateProjectileSalvo = function () {
    //this._fireSalvo();
    this._exitProjectileState();
};

/**
 * Update for the Burst projectile state. The Burst attack is a series of
 * projectile launches.
 * 
 * @returns {undefined}
 */
Golem.prototype._updateProjectileBurst = function () {
    this._exitProjectileState();
};

/**
 * Update for the Blast projectile state. This is extremely straightforward.
 * Blast is a fire-and-forget projectile attack, so we just fire off the Blast
 * and exit our projectile state.
 * 
 * @returns {undefined}
 */
Golem.prototype._updateProjectileBlast = function () {
    this._fireBlast();
    this._exitProjectileState();
};

/**
 * Sets the previousProjectileState to the current state, and then nulls
 * out the current state to indicate a projectile state is no longer active.
 * 
 * @returns {undefined}
 */
Golem.prototype._exitProjectileState = function () {
    this.mPreviousProjectileState = this.mCurrentProjectileState;
    this.mCurrentProjectileState = null;
};

/**
 * Fires a salvo of projectiles towards the hero. Currently undefined/
 * doesn't work.
 * 
 * @returns {undefined}
 */
Golem.prototype._fireSalvo = function () {
    for (var i = 0; i < Config.Golem.Projectiles.Salvo.Count; i++) {
        this._fireProjectile(Config.Golem.Projectiles.Salvo);
    }
};

/**
 * Fires a burst of projectiles towards the hero. Currently undefined.
 * 
 * @returns {undefined}
 */
Golem.prototype._fireBurst = function () {
    
};

/**
 * Fires a projectile blast towards the hero.
 * 
 * @returns {undefined}
 */
Golem.prototype._fireBlast = function () {
    this._fireProjectile(Config.Golem.Projectiles.Blast);
};

/**
 * Fires a single projectile defined by the Config_Golem file and 
 * chosen by the type parameter.
 * 
 * @param {Config.Golem.Projectile} type    Type of projectile to fire.
 * @returns {undefined}
 */
Golem.prototype._fireProjectile = function (type) {
    var newProjectile = null;
    switch(type) {
        case Config.Golem.Projectiles.Salvo:
            newProjectile = new GolemSalvoProjectile(
                Config.BossBattle.Textures.BossProjectileSprite,
                this.getXform().getPosition(),
                this.getXform().getOrientation(),
                this.mHero.getXform().getPosition()
            );
            console.log(newProjectile);
            break;
        case Config.Golem.Projectiles.Burst:
            break;
        case Config.Golem.Projectiles.Blast:
            newProjectile = new GolemBlastProjectile(
                Config.BossBattle.Textures.BossProjectileSprite,
                this.mGolem,
                this.mHero
            );
            break;
        default:
            console.log('invalid projectile type');
            break;
    }
    
    // If a projectile was successfully created, add it to the appropriate
    // GameObject sets.
    if (newProjectile !== null) {
        if (newProjectile.getRigidBody() === null) {
            this.mNonPhysicsSetRef.addToSet(newProjectile);
        } else {
            gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, newProjectile);
        }
        this.mTimeLastProjectileFired = Date.now();
    }
};