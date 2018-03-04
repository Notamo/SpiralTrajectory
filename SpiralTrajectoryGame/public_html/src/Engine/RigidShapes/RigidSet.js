/** 
 * File: RigidSet.js
 * 
 * RigidSet is a collection of rigidshapes for one object.
 */

/*jslint node: true, vars: true, evil: true, bitwise: true */
"use strict";

/* global gEngine, vec2, Transform, RigidRectangle, RigidCircle, RigidShape */

function RigidSet() {
    this.mRigidBodySet = {};
}

RigidSet.prototype.insert = function (key, emptyRigidGameObject) {
    this.mRigidBodySet[key] = emptyRigidGameObject;
};

RigidSet.prototype.get = function (key) {
    return this.mRigidBodySet[key];
};

RigidSet.prototype.size = function () {
    return this.mRigidBodySet.length;
};

RigidSet.prototype.update = function () {            
    for (var elem in this.mRigidBodySet) {
        this.mRigidBodySet[elem].update();
    }
};

RigidSet.prototype.draw = function (camera) {
    for (var elem in this.mRigidBodySet) {
        this.mRigidBodySet[elem].draw(camera);
    }
};

RigidSet.prototype.execFuncForAll = function (func) {
    for (var elem in this.mRigidBodySet) {
        func.call(this.get(elem));
    }
};

/*
RigidSet.prototype.insert = function (key, _rigidbody, _xOffset, _yOffset) {
    this.mRigidBodySet[key] = {
        rigidbody: _rigidbody,
        xOffset: _xOffset,
        yOffset: _yOffset
    };
};

RigidSet.prototype.get = function (key) {
    return this.mRigidBodySet[key];
};

RigidSet.prototype.update = function () {
    for (var elem in this.mRigidBodySet) {
        if (elem.rigidbody instanceof RigidRectangle) {
            RigidRectangle.prototype.update.call(elem.rigidbody);
        } else if (elem.rigidbody instanceof RigidCircle) {
            RigidCircle.prototype.update.call(elem.rigidbody);
        } else if (elem.rigidbody instanceof RigidShape) {
            RigidShape.prototype.update.call(elem.rigidbody);
        }
    }
};

RigidSet.prototype.draw = function (camera) {
    for (var elem in this.mRigidBodySet) {
        if (elem.rigidbody instanceof RigidRectangle) {
            RigidRectangle.prototype.draw.call(elem.rigidbody, camera);
        } else if (elem.rigidbody instanceof RigidCircle) {
            RigidCircle.prototype.draw.call(elem.rigidbody, camera);
        } else if (elem.rigidbody instanceof RigidShape) {
            RigidShape.prototype.draw.call(elem.rigidbody, camera);
        }
    }
};
*/