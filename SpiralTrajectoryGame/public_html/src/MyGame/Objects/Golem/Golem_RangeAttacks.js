/* File: Golem_RangeAttacks.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem, GolemBlastProjectile */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

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

Golem.prototype._updateProjectileSalvo = function () {
    // Salvo is a fire and forget projectile attack. If this function is called,
    // fire a salvo and transition out of the state.
    //this._fireSalvo();
    this._exitProjectileState();
};

Golem.prototype._updateProjectileBurst = function () {
    // A burst attack spans over several updates. 
    this._exitProjectileState();
};

Golem.prototype._updateProjectileBlast = function () {
    // Blast is a fire and forget projectile attack. if this function is called,
    // fire a blast and transition out of the state.
    this._fireBlast();
    this._exitProjectileState();
};

Golem.prototype._exitProjectileState = function () {
    this.mPreviousProjectileState = this.mCurrentProjectileState;
    this.mCurrentProjectileState = null;
};

Golem.prototype._fireSalvo = function () {
    for (var i = 0; i < Config.Golem.Projectiles.Salvo.Count; i++) {
        this._fireProjectile(Config.Golem.Projectiles.Salvo);
    }
};

Golem.prototype._fireBurst = function () {
    
};

Golem.prototype._fireBlast = function () {
    this._fireProjectile(Config.Golem.Projectiles.Blast);
};

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
    
    if (newProjectile !== null) {
        if (newProjectile.getRigidBody() === null) {
            this.mNonPhysicsSetRef.addToSet(newProjectile);
        } else {
            this.mPhysicsSetRef.addToSet(newProjectile);
        }
        this.mTimeLastProjectileFired = Date.now();
    }
};