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
    r.setGravity(false);
    r.setMass(0.1);
    r.setRestitution(1);
    r.setFriction(1);
    this.setRigidBody(r);
   
    //a reference to the hero so we can chase them
    this.mHero = hero;
    
    //Launching
    this.mLaunchDir = launchDir;
    this.kLaunchTime = 60;
    this.mLaunchFrame = 0;
    
    //to make sure these don't last forever
    this.kLifespan = 2;
    this.mTimeAlive = 0;
    
    //Projectile accuracy Controls
    //assumed linear ramp for now
    this.kMinAcc = 0.01;    //1%
    this.kMaxAcc = .1;      //10%
    this.mAccSlope = (this.kMaxAcc - this.kMinAcc) / (this.kLifespan * 60);
    this.mCurAcc = this.kMinAcc;
    
    //Projectile speed controls
    //assumed linear ramp for now
    this.kMinSpeed = 10;
    this.kMaxSpeed = 20;
    this.mSpeedSlope = (this.kMaxSpeed - this.kMinSpeed) / (this.kLifespan * 60);
    this.mCurSpeed = this.kMinSpeed;
    
    
    //Explode State
    this.mExplodeParticles = new ParticleGameObjectSet();

    //Set initial velocity
    this.getRigidBody().setVelocity(launchDir[0] * launchSpeed, launchDir[1] * launchSpeed);
    //this.getRigidBody().setAngularVelocity(3);
    this.mCurState = BossProjectile.eProjState.eLaunchState;
    
};

gEngine.Core.inheritPrototype(BossProjectile, GameObject);

BossProjectile.prototype.draw = function(aCamera) {
    if(this.mExplodeParticles !== null) { 
        this.mExplodeParticles.draw(aCamera);
    }
    
    if(this.mCurState !== BossProjectile.eProjState.eExplodeState)
        GameObject.prototype.draw.call(this, aCamera);
};

BossProjectile.prototype.update = function()
{   
    this.mExplodeParticles.update();
    
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
    
    if(this.mCurState !== BossProjectile.eProjState.eExplodeState)
        GameObject.prototype.update.call(this);
    
    
};

//Do an initial Launch
BossProjectile.prototype._serviceLaunch = function() {
    this.mRigidBody.update();
    
    if(this.mLaunchFrame >= this.kLaunchTime) {
        //this.mRigidBody.setGravity(false);
        this.mCurState = BossProjectile.eProjState.eChaseState;
        return;
    }
    this.mLaunchFrame++;
};

//Chase the player
BossProjectile.prototype._serviceChase = function() {
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
        this._explode();
    }
    this.mTimeAlive += (1/60);
};

//particle effects, and then expire
BossProjectile.prototype._serviceExplode = function() {
    if(this.mExplodeParticles.size() === 0) {
       this.mExpired = true;
       console.log("dead");
   }
   else
   {
       //console.log("not dead");
   }
};

BossProjectile.prototype.userCollisionHandling = function(obj) {

    switch(this.mCurState) {
        case BossProjectile.eProjState.eLaunchState:
                if(obj instanceof Terrain) {
                //this.mCurState = BossProjectile.eProjState.eExplodeState;
                return true;
            }
            
            if(obj instanceof Platform && this.mLaunchFrame < 10) {
                return false;
            }
            return true;
            break;
        case BossProjectile.eProjState.eChaseState:
            if(obj instanceof Platform) {
                this._explode();
                return true;
            }

            if(obj instanceof Terrain) {
                this._explode();
                return true;
            }

            if(obj instanceof Hero) {
                this._explode();
                //damage the hero?
                return true;
            }
            
            break;
        case BossProjectile.eProjState.eExplodeState:
            return false;
            break;   
    }
    return false;
};

BossProjectile.prototype._explode = function() {
    this.mExplodeParticles.addEmitterAt(
            this.getXform().getPosition(),
            1,
            this.createParticle,
            this.type
    );
    this.mCurState = BossProjectile.eProjState.eExplodeState;
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

BossProjectile.prototype.createParticle = function(x, y) {
    
    var life = 1000;//30 + 60 * Math.random();
    var p = new ParticleGameObject(
          Config.BossBattle.Textures.TorchParticleTexture,
            x,
            y,
            life
    );
    console.log(p.mCyclesToLive + "cycles");
    p.getRenderable().setColor([1, 0, 0, .3]);
    p.setFinalColor([0, 0, 1, 1]);
    
    //particle size
    var r = 5 + Math.random() * 10;
    p.getXform().setSize(r, r);
    
    var vx = 1 - 2*Math.random();
    var vy = Math.random();
    
    p.getParticle().setVelocity([vx, vy]);
    p.setSizeDelta(0);
    p.getParticle().setDrag(.98);
    
    
    return p;
};