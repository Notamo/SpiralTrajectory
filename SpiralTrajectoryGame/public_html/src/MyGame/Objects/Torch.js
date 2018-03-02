/* File: Torch.js 
 *
 * 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, RigidShape, RigidRectangle,
 *       Platform, Arrow, ParticleGameObjectSet, Config, Config_Torch */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Torch(spriteTexture, x, y, w, h, torchType) {
    this.type = torchType;
    this.mTorch = new SpriteRenderable(spriteTexture);
    this.mTorch.setColor(Config.Torch[this.type].Color);
    this.mTorch.getXform().setPosition(x, y);
    this.mTorch.getXform().setSize(w, h);
    this.lit = false;
    this.litTimer = 0;
    GameObject.call(this, this.mTorch);
    
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getHeight(),
        this.getXform().getHeight()
    );
    r.setMass(0);
    this.setRigidBody(r); 
    this.mParticles = new ParticleGameObjectSet();
    
    this.kTorchLife = 1200;
}
gEngine.Core.inheritPrototype(Torch, GameObject);

Torch.prototype.update = function () {
    if (this.lit === true){
        this.litTimer++;
        if (Math.random() > ((this.litTimer % 100) / 100)) {
            this.mParticles.addEmitterAt(
                this.getXform().getPosition(),
                1,
                this.createParticle,
                this.type
            );
        }
    }
     if (this.mParticles !== null) {
         this.mParticles.update();
     }
    //this is the actual time you have before the light runs out, and extra hits during the lit time don't reset it.
    if (this.litTimer >= Config.Torch[this.type].MaxTimeLit){
         this.litTimer = 0;
         this.lit = false;
     }
};

Torch.prototype.userCollisionHandling = function (obj) {
    if (obj instanceof Arrow) {
        this.lit = true;
    }
    
    // We don't want the torch actually blocking any of the game objects.
    if (obj instanceof Hero ||
        obj instanceof Boss) {
        return true;
    }
    return false;
};

Torch.prototype.createParticle = function (x, y) {
    var life = Config.Torch[this.type].Particle.MinLifespan + 
               Config.Torch[this.type].Particle.LifespanMultiplier *
               Math.random();
    var xOffset = Config.Torch[this.type].Particle.BaseXOffset + 
                  Config.Torch[this.type].Particle.XOffsetMultiplier *
                  Math.random();
    var yOffset = Config.Torch[this.type].Particle.BaseYOffset +
                  Config.Torch[this.type].Particle.YOffsetMultiplier *
                  Math.random();
    var p = new ParticleGameObject(
        Config.BossBattle.Textures.FlameParticleTexture, 
        x + xOffset, 
        y + yOffset, 
        life
    );
    p.getRenderable().setColor([
        Config.Torch[this.type].Particle.ColorRed,
        Config.Torch[this.type].Particle.ColorGreen,
        Config.Torch[this.type].Particle.ColorBlue,
        Config.Torch[this.type].Particle.ColorAlpha
    ]);
    
    // size of the particle
    var r = Config.Torch[this.type].Particle.MinSize + 
            Config.Torch[this.type].Particle.SizeMultiplier *
            Math.random();
    p.getXform().setSize(r, r);
    
    // final color
    var fr = Config.Torch[this.type].Particle.MinFinalColor[0] + 
             Config.Torch[this.type].Particle.MinFinalColorMultipliers[0] * 
             Math.random();
    var fg = Config.Torch[this.type].Particle.MinFinalColor[1] + 
             Config.Torch[this.type].Particle.MinFinalColorMultipliers[1] * 
             Math.random();
    var fb = Config.Torch[this.type].Particle.MinFinalColor[2] + 
             Config.Torch[this.type].Particle.MinFinalColorMultipliers[2] * 
             Math.random();
    var fa = Config.Torch[this.type].Particle.MinFinalColor[3] + 
             Config.Torch[this.type].Particle.MinFinalColorMultipliers[3] * 
             Math.random();
    p.setFinalColor([fr, fg, fb, fa]);
    if (Math.random() < .3) {
        p.setFinalColor([0, 0, 0, 1]);
    }
    
    // velocity on the particle
    var fx;
    if (xOffset > 0) {
        fx = Config.Torch[this.type].Particle.BaseXVelocity +
             (Config.Torch[this.type].Particle.XVelocityMultiplier * -1) *
             Math.random();
    }
    else {
        fx = (Config.Torch[this.type].Particle.BaseXVelocity * -1) +
             Config.Torch[this.type].Particle.XVelocityMultiplier *
             Math.random();
    }
    var fy = Config.Torch[this.type].Particle.BaseYVelocity +
             Config.Torch[this.type].Particle.YVelocityMultiplier *
             Math.random();
    p.getParticle().setVelocity([fx, fy]);
    p.setSizeDelta(Config.Torch[this.type].Particle.SizeDelta);
    
    var ax = Config.Torch[this.type].Particle.BaseXAcceleraation +
             Config.Torch[this.type].Particle.XAcceleraationMultiplier *
             Math.random();
    
    var ay = Config.Torch[this.type].Particle.BaseYAcceleraation +
             Config.Torch[this.type].Particle.YAcceleraationMultiplier *
             Math.random();
     
    p.getParticle().setAcceleration([ax, ay]);
    
    return p;
};

Torch.prototype.draw = function (camera) {
    if (this.mParticles !== null) {
        this.mParticles.draw(camera);
    }
    GameObject.prototype.draw.call(this, camera);
};

Torch.prototype.isLit = function() {
    return this.lit;
};
