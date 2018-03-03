/* File BossProjectile.js
 * 
 * Creates and initializes Boss Projectiles
 * 
 */

BossProjectile.eProjState = Object.freeze({
   eLaunchState: 0,         //initial launch by the boss
   eChaseState: 1,          //from the launch, chase the player
   eExplodeState: 2        //detonate, whether by hitting player, obstacle, or lifetime expire
});

function BossProjectile(projectileSprite, hero, launchPos, launchDir, launchSpeed) {
    //make the projectile renderable
    this.mProjectile = new TextureRenderable(projectileSprite);
    this.mProjectile.setColor([1, 1, 1, 0]);
    this.mProjectile.getXform().setPosition(launchPos[0], launchPos[1]);
    this.mProjectile.getXform().setSize(5, 5);
    GameObject.call(this, this.mProjectile);
    
    //set up a rigidbody for the projectile
    //change the type of rigidbody depending on what
    //sprite we decide on in the end
    var r = new RigidCircle(
            this.getXform(),
            2.5); //10 x 10 so radius is 5
    //r.setGravity(false);
    r.setMass(0.1);
    r.setRestitution(1);
    r.setFriction(1);
    this.setRigidBody(r);
   
    //a reference to the hero so we can chase them
    this.mHero = hero;
    
    //Launching
    this.mLaunchDir = launchDir;
    
    //to make sure these don't last forever
    this.kLifespan = 2;
    this.mTimeAlive = 0;
    
    //Projectile accuracy Controls
    //assumed linear ramp for now
    this.kMinAcc = 0.1;    //10%
    this.kMaxAcc = 0.1;      //15%
    this.mAccSlope = (this.kMaxAcc - this.kMinAcc) / (this.kLifespan * 60);
    this.mCurAcc = this.kMinAcc;
    
    //Projectile speed controls
    //assumed linear ramp for now
    this.kMinSpeed = 10;
    this.kMaxSpeed = 100;
    this.mSpeedSlope = (this.kMaxSpeed - this.kMinSpeed) / (this.kLifespan * 60);
    this.mCurSpeed = this.kMinSpeed;
    

    //Set initial velocity
    this.getRigidBody().setVelocity(launchDir[0] * launchSpeed, launchDir[1] * launchSpeed);
    this.mCurState = BossProjectile.eProjState.eLaunchState;
};

gEngine.Core.inheritPrototype(BossProjectile, GameObject);

BossProjectile.prototype.update = function()
{   
    GameObject.prototype.update.call(this);
    
    switch(this.mCurState) {
        case BossProjectile.eProjState.eLaunchState:
            this._serviceLaunch();
            break;
        case BossProjectile.eProjState.eChaseState:
            this._serviceChase();
            break;
        case BossProjectile.eProjState.eExplodeState:
            this._serviceExplode();
            break;
    };
};

//Do an initial Launch
BossProjectile.prototype._serviceLaunch = function() {
    this.mRigidBody.update();
    
    //switch states when it starts falling?
    if(this.mRigidBody.getVelocity()[1] <= 0){
        this.mRigidBody.setGravity(false);
        this.mCurState = BossProjectile.eProjState.eChaseState;
    }
};

//Chase the player
BossProjectile.prototype._serviceChase = function() {
    console.log()
    //Speed/Accuracy Slope Mgmt
    if(this.mCurSpeed > this.kMaxSpeed)
        this.mCurSpeed = this.kMaxSpeed;
    else
        this.mCurSpeed += this.mSpeedSlope;
    
    if(this.mCurAcc > this.kMaxAcc)
        this.mCurAcc = this.kMaxAcc;
    else
        this.mCurAcc += this.mAccSlope;
    
    this.mRigidBody.update();
    this._updateVelocity();
    
    if(this.mTimeAlive >= this.kLifespan) {
        this.mExpired = true;
    }
    this.mTimeAlive += (1/60);
};

//particle effects, and then expire
BossProjectile.prototype._serviceExplode = function() {
    this.mExpired = true;
};

BossProjectile.prototype.userCollisionHandling = function(obj) {

    switch(this.mCurState) {
        case BossProjectile.eProjState.eLaunchState:
                if(obj instanceof Terrain) {
                this.mCurState = BossProjectile.eProjState.eExplodeState;
                return true;
            }
            return true;
            break;
        case BossProjectile.eProjState.eChaseState:
            if(obj instanceof Platform) {
                this.mCurState = BossProjectile.eProjState.eExplodeState;
                return true;
            }

            if(obj instanceof Terrain) {
                this.mCurState = BossProjectile.eProjState.eExplodeState;
                return true;
            }

            if(obj instanceof Hero) {
                this.mCurState = BossProjectile.eProjState.eExplodeState;
                return true;
            }
            break;
        case BossProjectile.eProjState.eExplodeState:
            break;   
    }
    return false;
};

//_updateVelocity
//Changes the velocity to approach the hero
//gradually moves the projectile to face towards the hero
//to add "weight" to the projectile
BossProjectile.prototype._updateVelocity = function() {
    //rotate the current velocity direction to face closer to the player
    var heroPos = this.mHero.getXform().getPosition();
    var ourPos = this.getRigidBody().getCenter();
    
    //current Direction of motion and target direction
    var curDirection = this.getRigidBody().getVelocity();
    var targetDirection = vec2.fromValues(0, 0);
    vec2.subtract(targetDirection, heroPos, ourPos);
    
    
    //1. find the angle between our direction and the target direction
    var curAngDiff = Math.acos(vec2.dot(targetDirection, curDirection) / (vec2.length(targetDirection) * vec2.length(curDirection)));
    
 
    //2. use the current angle difference in combination with the accuracy, and the direction
    //  to calculate an angle of rotation for this frame (theta)
    var crossResult = vec3.fromValues(0, 0, 0); 
    vec2.cross(crossResult, targetDirection, curDirection); //z-component sign is oppsite direction to rotate
    var theta = -Math.sign(crossResult[2]) * curAngDiff * this.mCurAcc;


    //3. Take the current direcrtion & rotate by desired angle.
    //      set velocity according to desired speed
    var newDir = vec2.fromValues(0, 0);
    vec2.normalize(curDirection, curDirection);
    vec2.rotate(newDir, curDirection, theta);
    this.getRigidBody().setVelocity(newDir[0] * this.mCurSpeed, newDir[1] * this.mCurSpeed);
};