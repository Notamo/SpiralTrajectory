/* File BossProjectile.js
 * 
 * Creates and initializes Boss Projectiles
 * 
 */

BossProjectile.eProjectileState = Object.freeze({
   eChaseState: 0,          //chasing the player
   ePlayerHitState: 1,      //hit the player
   eObstacleHitState: 2,
   eLifeExpiredState: 3    //lifetime expired
});

function BossProjectile(projectileSprite, hero, startPosition, startRotation) {
    //make the projectile renderable
    this.mProjectile = new TextureRenderable(projectileSprite);
    this.mProjectile.setColor([1, 1, 1, 0]);
    this.mProjectile.getXform().setPosition(startPosition[0], startPosition[1]);
    this.mProjectile.getXform().setSize(10, 10);
    this.mProjectile.getXform().setOrientation(startRotation);
    GameObject.call(this, this.mProjectile);
    
    //a reference to the hero so we can chase them
    this.mHero = hero;
    
    //to make sure these don't last forever
    this.kLifespan = 4;
    this.mTimeAlive = 0;
    
    this.mSpeed = 1;
    
    //INTERPOLATION IS NOT THE WAY TO GO :P
    this.mChasePos = new InterpolateVec2(this.getXform().getPosition(), 120, 0.05);
    //this.mChaseRot = new Interpolate(this.getXform().getRotationInRad(), 120, 0.05);
};

gEngine.Core.inheritPrototype(BossProjectile, GameObject);

BossProjectile.prototype.draw = function(aCamera) {
    //console.log("BossProjectile Draw!");
    GameObject.prototype.draw.call(this, aCamera);
};

BossProjectile.prototype.update = function()
{
    //interpolate to the hero position
    GameObject.prototype.update.call(this);
    
    this.mChasePos.updateInterpolation();
    //this.mChaseRot.updateInterpolation();
    
    
    this.mChasePos.setFinalValue(this.mHero.getXform().getPosition());
    //this.mChaseRot.setFinalValue(hero.getXform().getRotationInRad());
    
    if(this.mTimeAlive >= this.kLifespan) {
        this.mExpired = true;
    }
    this.mTimeAlive += (1/60);
}
