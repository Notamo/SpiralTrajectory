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

function BossProjectile(projectileTexture, hero, startPosition, startRotation) {
    //make the projectile renderable
    this.mProjectile = new SpriteRenderable(projectileTexture);
    this.mProjectile.setColor([1, 1, 1, 0]);
    this.mProjectile.getXform().setPosition(startPosition[0], startPosition[1]);
    this.mProjectile.getXform().setSize(1, 1);
    this.mProjectile.getXform().setOrientation(startRotation);
    this.mProjectile.setElementPixelPositions(0, 0, 128, 128);
    GameObject.call(this, this.mProjectile);
    
    //a reference to the hero so we can chase them
    this.mHero = hero;
    
    //to make sure these don't last forever
    this.kLifespan = 4;
    this.mTimeAlive = 0;
    
    this.mSpeed = 1;
    
    this.mChasePos = new InterpolateVec2(this.getXform().getPosition(), 120, 0.05);
    this.mChaseRot = new Interpolate(this.getXform().getRotationInRad(), 120, 0.05);
};

BossProjectile.prototype.update = function()
{
    //interpolate to the hero position
    GameObject.prototype.update.call(this);
    
    this.mChasePos.updateInterpolation();
    this.mChaseRot.updateInterpolation();
    
    
    this.mChasePos.setFinalValue(vec2.fromValues(hero.getXform().getPosition));
    this.mChaseRot.setFinalValue(hero.getXform().getRotationInRad());
    
}
