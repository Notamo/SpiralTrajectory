/* File: Torch.js 
 *
 * 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, RigidShape, RigidRectangle,
 *       Platform, Arrow, ParticleGameObjectSet, */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Torch(spriteTexture) {
    this.mTorch = new SpriteRenderable(spriteTexture);
    this.mTorch.setColor([1, 1, 1, 0]);
    this.mTorch.getXform().setPosition(50, 5);
    this.mTorch.getXform().setSize(10, 10);
    GameObject.call(this, this.mTorch);
    
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getHeight(),
        this.getXform().getHeight()
    );
    r.setMass(0);
    this.setRigidBody(r);
    
    this.mParticles = null;
}
gEngine.Core.inheritPrototype(Torch, GameObject);

Torch.prototype.update = function () {
     if (this.mParticles !== null) {
         this.mParticles.update();
         if (this.mParticles.size() === 0) {
             this.mParticles = null;
         }
     }
};

Torch.prototype.userCollisionHandling = function (obj) {
    if (obj instanceof Arrow) {
        this.mParticles = new ParticleGameObjectSet();
        this.mParticles.addEmitterAt(
            this.getXform().getPosition(),
            200,
            this.createParticle
        );
        this.mParticles.update();
    }
    
    // We don't want the torch actually blocking any of the game objects.
    if (obj instanceof Hero ||
        obj instanceof Boss) {
        return true;
    }
};

Torch.prototype.createParticle = function (x, y) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", x, y, life);
    p.getRenderable().setColor([1, 0, 0, 1]);
    
    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getParticle().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};

Torch.prototype.draw = function (camera) {
    if (this.mParticles !== null) {
        this.mParticles.draw(camera);
    }
    GameObject.prototype.draw.call(this, camera);
};