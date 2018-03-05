/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

BossBattle.prototype._initializeUI = function() {    
    this.mestText = new UIText("Arrow Types", vec2.fromValues(25, 780), null);
    this.mestText.setTextHeight(4);
    var arrowSelectSprites = [Config.BossBattle.Textures.UIArrowIcon,
                              Config.BossBattle.Textures.UIFireArrowIcon,
                              Config.BossBattle.Textures.UIIceArrowIcon];
                         
    this.arrowSelector = new UIArrowSelection(arrowSelectSprites, Config.BossBattle.Textures.UIArrowBorders, vec2.fromValues(150, 850), 100);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mestText);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.arrowSelector);
};

BossBattle.prototype._updateUI = function() {
    this.arrowSelector.select(this.mHero.getArrowSelection());
    var cooldowns = this.mHero.mArrowSet.getCooldownStatus();
    for(var i = 0; i < cooldowns.length; i++)
        this.arrowSelector.setActive(i, cooldowns[i]);
    
};



