/* File BossProjectile.js
 * 
 * Creates and initializes Boss Projectiles
 * 
 */

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
    this.mLaunchFrame = 0;
    this.mTimeAlive = 0;
    
    //Projectile accuracy Controls
    this.mAccSlope = (Config.BossProjectile.MaxAccuracy - Config.BossProjectile.MinAccuracy) / 
                        (Config.BossProjectile.Lifespan * 60);
    this.mCurAcc = Config.BossProjectile.MinAccuracy;
    //Projectile speed controls
    this.mSpeedSlope = (Config.BossProjectile.MaxSpeed - Config.BossProjectile.MinSpeed) / 
                        (Config.BossProjectile.Lifespan * 60);
    this.mCurSpeed = Config.BossProjectile.MinSpeed;

    //Explostion particle effects
    this.mParticles = new ParticleGameObjectSet();

    //Set initial velocity
    this.getRigidBody().setVelocity(launchDir[0] * launchSpeed, launchDir[1] * launchSpeed);
    this.mCurState = Config.BossProjectile.States.Launch;
    
};

gEngine.Core.inheritPrototype(BossProjectile, GameObject);

BossProjectile.prototype.draw = function(aCamera) {
    if(this.mParticles !== null) { 
        this.mParticles.draw(aCamera);
    }
    
    if(this.mCurState !== Config.BossProjectile.States.Explode)
        GameObject.prototype.draw.call(this, aCamera);
};

BossProjectile.prototype.update = function()
{   
    this.mParticles.update();
    
    switch(this.mCurState) {
        case Config.BossProjectile.States.Launch:
            this._serviceLaunch();
            break;
        case Config.BossProjectile.States.Chase:
            this._serviceChase();
            break;
        case Config.BossProjectile.States.Explode:
            this._serviceExplode();
            break;
    };
    
    if(this.mCurState !== Config.BossProjectile.States.Explode)
        GameObject.prototype.update.call(this);
};

//Do an initial Launch
BossProjectile.prototype._serviceLaunch = function() {
    this.mRigidBody.update();
    
    if(this.mLaunchFrame >= Config.BossProjectile.LaunchTime) {
        this.mCurState = Config.BossProjectile.States.Chase;
        return;
    }
    this.mLaunchFrame++;
};

//Chase the player
BossProjectile.prototype._serviceChase = function() {
    //Speed/Accuracy Slope Mgmt
    if(this.mCurSpeed > Config.BossProjectile.MaxSpeed)
        this.mCurSpeed = Config.BossProjectile.MaxSpeed;
    else
        this.mCurSpeed += this.mSpeedSlope;
    
    if(this.mCurAcc > Config.BossProjectile.MaxAccuracy)
        this.mCurAcc = Config.BossProjectile.MaxAccuracy;
    else
        this.mCurAcc += this.mAccSlope;
    
    this.mRigidBody.update();
    this._updateVelocity();
    
    if(this.mTimeAlive >= Config.BossProjectile.Lifespan) {
        this._explode();
    }
    this.mTimeAlive += (1/60);
};

//particle effects, and then expire
BossProjectile.prototype._serviceExplode = function() {
    if(this.mParticles.size() === 0) {
       this.mExpired = true;
   }
};

BossProjectile.prototype.userCollisionHandling = function(obj) {

    
    
    switch(this.mCurState) {
        case Config.BossProjectile.States.Launch:
            if(obj instanceof Terrain) {
                return true;
            }
            
            if(obj instanceof Platform && this.mLaunchFrame < 10) {
                return true;
            }
            
            return false;
            
            break;
        case Config.BossProjectile.States.Chase:
            if(obj instanceof Platform) {
                console.log("platform boom");
                this._explode();
                return false;
            }

            if(obj instanceof Terrain) {
                console.log("terrain boom");
                this._explode();
                return false;
            }

            if(obj instanceof Hero) {
                console.log("hero boom");
                this._explode();
                return false;
            }
            
            return true;
            break;
        case Config.BossProjectile.States.Explode:
            return true;
            break;   
    }
    return true;
};

BossProjectile.prototype._explode = function() {
    this.mParticles.addEmitterAt(
            this.getXform().getPosition(),
            Config.BossProjectile.Explosion.NumParticles,
            this.createParticle,
            0
    );
    this.mCurState = Config.BossProjectile.States.Explode;
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

BossProjectile.prototype.createParticle = function (x, y) {
    var life = Config.BossProjectile.Explosion.Lifespan;
    var xOffset = 0;
    var yOffset = 0;
    var p = new ParticleGameObject(
        Config.BossBattle.Textures.TorchParticleTexture, 
        x + xOffset, 
        y + yOffset, 
        life
    );
    
    p.getRenderable().setColor(Config.BossProjectile.Explosion.StartColor);
    p.setFinalColor(Config.BossProjectile.Explosion.FinalColor);
    
    // size of the particle
    var r = Config.BossProjectile.Explosion.MinSize + 
            Config.BossProjectile.Explosion.SizeMultiplier *
            Math.random();
    p.getXform().setSize(r, r);

    //shoot in a random direction
    var vx = Config.BossProjectile.Explosion.BaseVelocity[0] + 
             Config.BossProjectile.Explosion.VelocityMultiplier[0] * Math.random();
    var vy = Config.BossProjectile.Explosion.BaseVelocity[1] + 
             Config.BossProjectile.Explosion.VelocityMultiplier[1] * Math.random();
    p.getParticle().setVelocity([vx, vy]);

    p.setSizeDelta(Config.BossProjectile.Explosion.SizeDelta);
    
    
    var accDir = vec2.fromValues(-vx, -vy);
    vec2.normalize(accDir, accDir);
    vec2.scale(accDir, accDir, Config.BossProjectile.Explosion.Deceleration);
    p.getParticle().setAcceleration([accDir[0], accDir[1]]);
    
    return p;
};