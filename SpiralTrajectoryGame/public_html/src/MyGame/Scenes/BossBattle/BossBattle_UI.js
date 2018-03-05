/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

BossBattle.prototype._initializeUI = function() {    
    this.mestText = new UIText("Hello World!", vec2.fromValues(25, 450), null);
    this.mestText.setTextHeight(5);
    var arrowSelectSprites = [Config.BossBattle.Textures.UIArrowIcon,
                              Config.BossBattle.Textures.UIFireArrowIcon,
                              Config.BossBattle.Textures.UIIceArrowIcon];
                         
    this.arrowSelector = new UIArrowSelection(arrowSelectSprites, Config.BossBattle.Textures.UIArrowBorders, vec2.fromValues(150, 850), 100);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mestText);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.arrowSelector);
};

BossBattle.prototype._updateUI = function() {
    //console.log("updateUI");
    this.mestText.setText("Hello");
    
};



