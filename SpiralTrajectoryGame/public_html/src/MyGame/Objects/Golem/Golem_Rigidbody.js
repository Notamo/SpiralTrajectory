/* File: Golem_RigidBody.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem,
 * RigidSet, GolemEmptyGameObject, RigidRectangle, RigidCircle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

Golem.prototype._buildRigidbodies = function() {
    var temp, r;
    r = new RigidRectangle(
        this.getXform(),
        0,
        0
    );
    r.setMass(Config.Golem.Properties.Physics.Mass);
    r.setRestitution(Config.Golem.Properties.Physics.Restitution);
    r.setFriction(Config.Golem.Properties.Physics.Friction); 
    this.setRigidBody(r);
    
    for (var rbody in Config.Golem.Rigidbodies) {
        temp = new GolemEmptyGameObject(
            this,
            Config.Golem.Rigidbodies[rbody].XOffset,
            Config.Golem.Rigidbodies[rbody].YOffset,
            Config.Golem.Rigidbodies[rbody].Type.call()
        );
        temp.getXform().setPosition(
            this.mGolem.getXform().getXPos() + Config.Golem.Rigidbodies[rbody].XOffset,
            this.mGolem.getXform().getYPos() + Config.Golem.Rigidbodies[rbody].YOffset
        );
        temp.getXform().setSize(
            this.mGolem.getXform().getWidth() * Config.Golem.Rigidbodies[rbody].WidthMultiplier,
            this.mGolem.getXform().getHeight() * Config.Golem.Rigidbodies[rbody].HeightMultiplier
        );

        r = new RigidRectangle(
                    temp.getXform(),
                    temp.getXform().getWidth(),
                    temp.getXform().getHeight()
                );

        switch (Config.Golem.Rigidbodies[rbody].Type.call()) {
            case Config.Engine.RigidShapeTypes.Rectangle:
                r = new RigidRectangle(
                    temp.getXform(),
                    temp.getXform().getWidth(),
                    temp.getXform().getHeight()
                );
                break;
            case Config.Engine.RigidShapeTypes.Circle:
                r = new RigidCircle(
                    temp.getXform(),
                    Config.Golem.Rigidbodies[rbody].Radius
                );
                break;
        } 
        if (r === null) {
            continue;
        }
        r.setMass(Config.Golem.Rigidbodies[rbody].Physics.Mass);
        r.setRestitution(Config.Golem.Rigidbodies[rbody].Physics.Restitution);
        r.setFriction(Config.Golem.Rigidbodies[rbody].Physics.Friction);
        temp.setRigidBody(r);
        temp.toggleDrawRigidShape();
        this.mPhysicsSetRef.addToSet(temp);
        this.mRigidSet.insert(Config.Golem.Rigidbodies[rbody].Name, temp);
    }
};

Golem.prototype.ignoreCollision = function () {
    this.mRigidSet.execFuncForAll(function () {
        this.ignoreCollision();
    });
};

Golem.prototype.allowCollision = function () {
    this.mRigidSet.execFuncForAll(function () {
        this.allowCollision();
    });
};

Golem.prototype.switchDirection = function () {
    for (var rbody in Config.Golem.Rigidbodies) {
        this.mRigidSet.get(Config.Golem.Rigidbodies[rbody].Name).mXOffset *= -1;
    }

    switch (this.mFacing) {
        case Config.Golem.States.FacingLeft:
            this.mFacing = Config.Golem.States.FacingRight;
            this.getXform().setOrientation(-1);
            break;
        case Config.Golem.States.FacingRight:
            this.mFacing = Config.Golem.States.FacingLeft;
            this.getXform().setOrientation(1);
            break;
    }
};