/* File: Golem_Animation.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

Golem.prototype._animate = function (animation, reset) {
    for (var animType in Config.Golem.Animations) {
        if (Config.Golem.Animations[animType] === animation) {
            this.mGolem.setSpriteSequence(
                animation.TopLeftX,
                animation.TopLeftY,
                animation.Width,
                animation.Height,
                animation.Count,
                animation.Padding
            );
            this.mGolem.setAnimationType(animation.Type.call());
            this.mGolem.setAnimationSpeed(animation.Speed);
            break;
        }
    }
    
    if (reset === true) {
        this.mGolem.resetAnimation();
    }
};
