/* File: Torch.js 
 *
 * 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, RigidShape, RigidRectangle,
 *       Platform, Arrow, ParticleGameObjectSet, */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Torch(spriteTexture, x, y, w, h) {
    this.mTorch = new SpriteRenderable(spriteTexture);
    this.mTorch.setColor([1, 1, 1, 0]);
    this.mTorch.getXform().setPosition(50, 5);
    this.mTorch.getXform().setSize(10, 10);
    this.lit=false;
    this.litTimer=0;
    this.mTorch.getXform().setPosition(x, y);
    this.mTorch.getXform().setSize(w, h);
    GameObject.call(this, this.mTorch);
    
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getHeight(),
        this.getXform().getHeight()
    );
    r.setMass(0);
    this.setRigidBody(r);
    
    this.mParticles = new ParticleGameObjectSet();
}
gEngine.Core.inheritPrototype(Torch, GameObject);

Torch.prototype.update = function () {
    if(this.lit===true && Math.random() > .5){
            this.mParticles.addEmitterAt(
            this.getXform().getPosition(),
            1,
            this.createParticle
        );
        this.litTimer++;
    }
     if (this.mParticles !== null) {
         this.mParticles.update();
     }
     //this is the actual time you have before the light runs out, and extra hits during the lit time don't reset it.
     if(this.litTimer>=1200){
         this.litTimer=0;
         this.lit=false;
     }
};

Torch.prototype.userCollisionHandling = function (obj) {
    if (obj instanceof Arrow) {
        this.lit=true;
    }
    
    // We don't want the torch actually blocking any of the game objects.
    if (obj instanceof Hero ||
        obj instanceof Boss) {
        return true;
    }
    return false;
};

Torch.prototype.createParticle = function (x, y) {
    var life = 30 + Math.random() * 200;
    var xOffset =(1 - Math.random()*2);
    var p = new ParticleGameObject(Config.BossBattle.Textures.FlameParticleTexture, x + xOffset, y + 3 , life);
    p.getRenderable().setColor([1, 0, 0, 1]);
    
    // size of the particle
    var r = 1 + Math.random() * 6;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.3 + 0.1 * Math.random();
    var fb = 0.2 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, .5]);
    
    // velocity on the particle
    var fx;
    if (xOffset > 0) {
        fx = -10 * Math.random() + 5;
    }
    else {
        fx = 10 * Math.random() - 5;
    }
    var fy = 20 * Math.random();
    p.getParticle().setVelocity([fx, fy]);
    
    var a = 5 + Math.random()*5;
    // size delta
    p.setSizeDelta(0.98);
    p.getParticle().setAcceleration([0,a]);
    
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
