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

function BossProjectile(projectileSprite, hero, initPos, initDir, print) {
    //make the projectile renderable
    this.mProjectile = new TextureRenderable(projectileSprite);
    this.mProjectile.setColor([1, 1, 1, 0]);
    this.mProjectile.getXform().setPosition(initPos[0], initPos[1]);
    this.mProjectile.getXform().setSize(5, 5);
    GameObject.call(this, this.mProjectile);
    
    //set up a rigidbody for the projectile
    //change the type of rigidbody depending on what
    //sprite we decide on in the end
    var r = new RigidCircle(
            this.getXform(),
            2.5); //10 x 10 so radius is 5
    r.setMass(100);
    r.setRestitution(1);
    r.setFriction(1);
    this.setRigidBody(r);
    
    this.mDir = initDir;
   
    //a reference to the hero so we can chase them
    this.mHero = hero;
    
    //to make sure these don't last forever
    this.kLifespan = 2;
    
    //Projectile accuracy Controls
    //assumed linear ramp for now
    this.kMinAccuracy = 0.1;    //10%
    this.kMaxAccuracy = 0.15;      //100%
    this.mAccuracySlope = (this.kMaxAccuracy - this.kMinAccuracy) / (this.kLifespan * 60);
    this.mCurrentAccuracy = this.kMinAccuracy;
    
    //Projectile speed controls
    //assumed linear ramp for now
    this.kMinSpeed = 1;
    this.kMaxSpeed = 100;
    this.mSpeedSlope = (this.kMaxSpeed - this.kMinSpeed) / (this.kLifespan * 60);
    this.mCurSpeed = this.kMinSpeed;
    
    this.mTimeAlive = 0;
    
    
    this.kDisp = print;
    this.mFrame = 0;
    
    //Set initial velocity
    this.mTargetDir = vec2.fromValues(0, 0);
    this.getRigidBody().setVelocity(initDir[0] * this.mCurSpeed, initDir[1] * this.mCurSpeed);
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

    
    if(this.mCurSpeed > this.kMaxSpeed)
        this.mCurSpeed = this.kMaxSpeed;
    else
        this.mCurSpeed += this.mSpeedSlope;
    
    if(this.mCurrentAccuracy > this.kMaxAccuracy)
        this.mCurrentAccuracy = this.kMaxAccuracy;
    else
        this.mCurrentAccuracy += this.mAccuracySlope;
    
    //console.log("speed: " + this.mCurSpeed);
    //console.log("accuracy: " + this.mCurrentAccuracy);
    
    this._updateVelocity();
        
    if(this.mTimeAlive >= this.kLifespan) {
        this.mExpired = true;
    }
    this.mTimeAlive += (1/60);

    this.mRigidBody.update();
    this.mFrame++;
};

BossProjectile.prototype.userCollisionHandling = function(obj) {
    console.log("col");
    return true;
};

BossProjectile.prototype._updateVelocity = function() {
    //rotate the current velocity direction to face closer to the player
    var heroPos = this.mHero.getXform().getPosition();
    var ourPos = this.getRigidBody().getCenter();

    //get the target direction vector
    var targetDirection = vec2.fromValues(0, 0);
    vec2.subtract(targetDirection, heroPos, ourPos);
    
    var curDirection = this.getRigidBody().getVelocity();
    
    //find the angle between our direction and the target direction (in radians)    
    var curAngDiff = Math.acos(vec2.dot(targetDirection, curDirection) / (vec2.length(targetDirection) * vec2.length(curDirection)));
    //the z component of the cross product can tell us which direction to adjust
    var crossResult = vec3.fromValues(0, 0, 0);
    vec2.cross(crossResult, targetDirection, curDirection);
    
    var theta = -Math.sign(crossResult[2]) * curAngDiff * this.mCurrentAccuracy;

    //set the new velocity vector
    var newDir = vec2.fromValues(0, 0);
    vec2.normalize(curDirection, curDirection);
    vec2.rotate(newDir, curDirection, theta);   //theta must be in radians
    //this.getRigidBody().setAngularVelocityDelta(theta);
    this.getRigidBody().setVelocity(newDir[0] * this.mCurSpeed, newDir[1] * this.mCurSpeed);
    
    
    
    //Data reports for debugging
    if(this.kDisp === true && (this.mFrame % 120 === 0)) {
        console.log(" ");
        console.log("ourPos: " + ourPos);
        console.log("heroPos: " + heroPos);
        console.log("targetDir: " + targetDirection);
        console.log("curDir: " + curDirection);

        console.log("newDir: " + newDir);
        console.log("curAngDiff: " + curAngDiff * (180 / Math.PI));
        //console.log("theta: " + theta * (180/ Math.PI));
        //console.log("fixedTheta: " + fixedTheta * (180 / Math.PI));
    }
        
    
};

BossProjectile.prototype._calculateAccuracy = function() {
  //this.mCurrentAccuracy =   
};