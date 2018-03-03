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
    
    this.mRigidSet = new RigidSet();
    
    this._buildRigidbodies();
}

gEngine.Core.inheritPrototype(Golem, GameObject);

Golem.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mGolem.draw(aCamera);
    this.mRigidSet.draw(aCamera);
};

Golem.prototype.update = function () {
    //this.mGolem.getXform().incYPosBy(0.1);
    this.mRigidBody.update();
    this.mRigidSet.update();
    this.mGolem.updateAnimation();
};