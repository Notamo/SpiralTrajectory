/* File: Golem_BlastProjectile.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem,
 *  , GolemProjectile, Hero*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function GolemBlastProjectile(sprite, golem, hero) {
    this.mTouchedHero = false;
    this.mHero = hero;
    this.mGolem = golem;
    this.mFramesSinceCreated = 0;
    this.mRadiusDelta = (Config.Golem.Projectiles.Blast.EndRadius - Config.Golem.Projectiles.Blast.StartRadius) / Config.Golem.Projectiles.Blast.WindupTime;
    this.mRotationDelta = 0;
    this.mFinalTargetVector = null;
    this.mBasePower = Config.Golem.Projectiles.Blast.BasePower;
    this.mPowerDelta = Config.Golem.Projectiles.Blast.PowerDelta;
    this.mBaseDamage = Config.Golem.Projectiles.Blast.BaseDamage;
    
    this.mProjectile = new TextureRenderable(sprite);
    this.mProjectile.setColor(Config.Golem.Projectiles.Blast.Color);
    this.mProjectile.getXform().setPosition(
        this.mGolem.getXform().getXPos(), 
        this.mGolem.getXform().getYPos()
    );
    this.mProjectile.getXform().setSize(
        Config.Golem.Projectiles.Blast.StartRadius,
        Config.Golem.Projectiles.Blast.StartRadius
    );   
    GolemProjectile.call(this, this.mProjectile);
    
    var r = new RigidCircle(
        this.getXform(),
        this.getXform().getWidth()
    );
    r.setMass(Config.Golem.Projectiles.Blast.Physics.Mass);
    r.setRestitution(Config.Golem.Projectiles.Blast.Physics.Restitution);
    r.setFriction(Config.Golem.Projectiles.Blast.Physics.Friction);
    this.setRigidBody(r);
}
gEngine.Core.inheritPrototype(GolemBlastProjectile, GolemProjectile);

GolemBlastProjectile.prototype.update = function () {
    var projectileXform = this.mProjectile.getXform();
    var golemXform = this.mGolem.getXform();
    
    if (this.mFramesSinceCreated < Config.Golem.Projectiles.Blast.WindupTime) {
        projectileXform.setPosition(
            golemXform.getXPos(), 
            golemXform.getYPos() + Config.Golem.Projectiles.Blast.YOffset
        );

        if (projectileXform.getWidth() < Config.Golem.Projectiles.Blast.EndRadius) {  
            projectileXform.setSize(
                projectileXform.getWidth() + this.mRadiusDelta,
                projectileXform.getWidth() + this.mRadiusDelta
            );
        }
        this.mRotationDelta += Config.Golem.Projectiles.Blast.RotationDelta;
        
        this.mFramesSinceCreated++;
    } else if (this.mFinalTargetVector === null) {
        this.mFinalTargetVector = vec2.fromValues(0, 0);
        vec2.subtract(this.mFinalTargetVector, this.mHero.getXform().getPosition(), projectileXform.getPosition());
        vec2.normalize(this.mFinalTargetVector, this.mFinalTargetVector);
        vec2.multiply(this.mFinalTargetVector, this.mFinalTargetVector, this.mBasePower);
    }
    
    projectileXform.incRotationByDegree(this.mRotationDelta);
    if (this.mFinalTargetVector !== null) {
        vec2.multiply(this.mFinalTargetVector, this.mFinalTargetVector, this.mPowerDelta);
        projectileXform.incXPosBy(this.mFinalTargetVector[0]);
        projectileXform.incYPosBy(this.mFinalTargetVector[1]);
    }
    
    if (projectileXform.getXPos() < -50 ||
        projectileXform.getXPos() > 500 || 
        projectileXform.getYPos() < -50 ||
        projectileXform.getYPos() > 250) {
        this.setExpired(true);
    }
};

GolemBlastProjectile.prototype.userCollisionHandling = function (obj) {
    if (obj instanceof Hero && this.mTouchedHero === false) {
        this.mTouchedHero = true;
        this.mHero.hit(this.mBaseDamage);
    }
    return true;
};