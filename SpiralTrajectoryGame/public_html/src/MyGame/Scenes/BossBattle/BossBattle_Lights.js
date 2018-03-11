/*
 * File: BossBattle_Lights: support the creation of light for BossBattle
 */
/*jslint node: true, vars: true */
/*global gEngine, BossBattle, Light, LightSet, IllumRenderable, GameObject, LightRenderable */
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
    var l;
    l = this._createALight(Light.eLightType.eDirectionalLight,
            [15, 50, 10],           // position (not used by directional)
            [-.2, -.2, -1],         // Pointing direction 
            [0.3, 0.325, 0.3, 1],   // color
            500, 500,               // near anf far distances: essentially switch this off
            0.1, 0.2,               // inner and outer cones
            0.8,                    // intensity
            1.0                     // drop off
            );
    this.mGlobalLightSet.addToSet(l);
};

BossBattle.prototype._setupShadow = function () {
    this.mBgShadow = new ShadowReceiver(this.mBgL1);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eShadowReceiver, this.mBgShadow);
    var actors = gEngine.LayerManager.getLayer(gEngine.eLayer.eActors);
    for (var i = 0; i < actors.size(); i++) {
        if (actors.getObjectAt(i) instanceof GameObject){
            if (actors.getObjectAt(i).getRenderable() instanceof LightRenderable){
                
                gEngine.LayerManager.addAsShadowCaster(actors.getObjectAt(i));
            }
        }
    }
};
