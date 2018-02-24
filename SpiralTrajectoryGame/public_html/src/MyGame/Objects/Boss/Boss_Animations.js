/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

Boss.eBossAnim = Object.freeze({
   eSpawnAnim: 0,       //spawning in
   eIdleAnim: 1,        //Idling/moving
   eSmashAnim: 2,       //Smashing
   eDeathAnim: 3       //Death animation
});

//Setup the corresponding animation we need
Boss.prototype._setupAnimation = function(animation, reset) {
    switch(animation) {
        case Boss.eBossAnim.eSpawnAnim:
            this.mGolem.setSpriteSequence(470, 0,         //first element position: top left
                            256, 170,     //width x height
                            15,            //num elements
                            0);           //horizontal padding
            this.mGolem.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
            this.mGolem.setAnimationSpeed(4);
            break;
            
        case Boss.eBossAnim.eIdleAnim:
            this.mGolem.setSpriteSequence(982, 0,         //first element position: top left
                            256, 170,     //width x height
                            6,            //num elements
                            0);           //horizontal padding
            this.mGolem.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
            this.mGolem.setAnimationSpeed(4);
            break;
            
        case Boss.eBossAnim.eSmashAnim:
            this.mGolem.setSpriteSequence(726, 0,         //first element position: top left
                            256, 170,     //width x height
                            6,            //num elements
                            0);           //horizontal padding
            this.mGolem.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
            this.mGolem.setAnimationSpeed(4);
            break;
            
        case Boss.eBossAnim.eDeathAnim:
            this.mGolem.setSpriteSequence(214, 0,         //first element position: top left
                            256, 170,     //width x height
                            7,            //num elements
                            0);           //horizontal padding
            this.mGolem.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
            this.mGolem.setAnimationSpeed(4);
            break;
        default:
            console.error("Invalid animation!")
            return;
    }
    
    if(reset === true)
        this.mGolem.resetAnimation();
};

