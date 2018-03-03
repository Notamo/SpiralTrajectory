/* File: Golem.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, Arrow, Platform, Config,
 *       RigidSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Golem(sprite, heroRef, physicsGameObjectArrayRef) {
    // Save the reference to the physics set.
    this.mPhysicsSetRef = physicsGameObjectArrayRef;
    
    // Save a reference to the hero.
    this.mHero = heroRef;
    
    // References to torches.
    this.mTorches = [];
    
    // Setup the renderable
    this.mGolem = new SpriteAnimateRenderable(sprite);
    this.mGolem.setColor(Config.Golem.Properties.Color);
    this.mGolem.getXform().setPosition(
        Config.BossBattle.Boss.SpawnPosition.X,
        Config.BossBattle.Boss.SpawnPosition.Y
    );
    this.mGolem.getXform().setSize(
        Config.BossBattle.Boss.Size.Width,
        Config.BossBattle.Boss.Size.Height
    );
    this._animate(Config.Golem.Animations.Idle, true);
    GameObject.call(this, this.mGolem);
    
    // Physics stuff
    this.mRigidSet = new RigidSet();
    this._buildRigidbodies();
    
    // HP stuff
    this.mMaxHP = Config.Golem.Properties.StartingHP;
    this.mCurrentHP = this.mMaxHP;
    this.mTorchBoost = 1.0;
}

gEngine.Core.inheritPrototype(Golem, GameObject);

Golem.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mGolem.draw(aCamera);
    this.mRigidSet.draw(aCamera);
};

Golem.prototype.update = function () {
    this.getXform().incXPosBy(0.1);
    this.calculateTorchBoost();
    this.mRigidBody.update();
    this.mRigidSet.update();
    this.mGolem.updateAnimation();
};

Golem.prototype.hit = function (damage) {    
    this.mCurrentHP -= (damage * this.mTorchBoost);
    console.log(this.mCurrentHP);
};

Golem.prototype.addTorchRef = function (torch) {
    this.mTorches.push(torch);
};

Golem.prototype.calculateTorchBoost = function () {
    this.mTorchBoost = 1.0;
    for (var i = 0; i < this.mTorches.length; i++) {
        this.mTorchBoost += this.mTorches[i].getBoost();
    }
};