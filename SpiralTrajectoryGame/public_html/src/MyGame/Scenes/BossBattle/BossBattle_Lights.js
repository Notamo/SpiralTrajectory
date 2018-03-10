/*
 * File: BossBattle_Lights: support the creation of light for BossBattle
 */
/*jslint node: true, vars: true */
/*global gEngine, BossBattle, Light, LightSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

BossBattle.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);
    light.setLightCastShadowTo(true);

    return light;
};

BossBattle.prototype._initializeLights = function () {
    this.mGlobalLightSet = new LightSet();
    
    l = this._createALight(Light.eLightType.eDirectionalLight,
            [15, 50, 10],           // position (not used by directional)
            [-5, -5, -.5],         // Pointing direction 
            [0.3, 0.325, 0.3, 1],     // color
            500, 500,               // near anf far distances: essentially switch this off
            0.1, 0.2,               // inner and outer cones
            1.2,                    // intensity
            1.0                     // drop off
            );
    this.mGlobalLightSet.addToSet(l);

    var l = this._createALight(Light.eLightType.ePointLight,
            [10, 25, 10],         // position
            [1, 0, -1],          // Direction 
            [0.6, 1.0, 0.0, 1],  // some color
            2, 30,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            5,                   // intensity
            10                  // drop off
            );
    l.setLightCastShadowTo(true);
    this.mGlobalLightSet.addToSet(l);

    l = this._createALight(Light.eLightType.eSpotLight,
            [65, 25, 12],            // Right minion position
            [-0.02,  0.02, -1],     // direction
            [0.5, 0.5, 0.5, 1],     // color
            20, 40,                  // near and far distances
            1.9, 2.0,               // inner outter angles (in radius)
             5,                     // intensity
            1.2                     // drop off
            );
    l.setLightCastShadowTo(true);
    this.mGlobalLightSet.addToSet(l);

    l = this._createALight(Light.eLightType.eSpotLight,
            [60, 50, 12],            // Center of camera 
            [0.02, -0.02, -1],
            [0.8, 0.2, 0.2, 1],      //  color
            20, 40,                   // near and far distances
            1.2, 1.3,                // inner and outer cones
            2,                       // intensity
            1.5                      // drop off
            );
    l.setLightCastShadowTo(true);
    this.mGlobalLightSet.addToSet(l);
};

BossBattle.prototype._setupShadow = function () {
    this.mBgShadow = new ShadowReceiver(this.mBgL1);
    var actors = gEngine.LayerManager.getLayer(gEngine.eLayer.eActors);
    for (var i = 0; i < actors.size(); i++) {
        if (actors.getObjectAt(i).getRenderable() instanceof LightRenderable){
            this.mBgShadow.addShadowCaster(actors.getObjectAt(i));
        }

    }

};
