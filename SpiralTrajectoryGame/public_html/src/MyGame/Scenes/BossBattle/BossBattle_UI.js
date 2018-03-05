/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

BossBattle.prototype._initializeUI = function() {    
    this.mestText = new UIText("Hello World!");
    this.mestText.getUIXform().setPosition(-.48, .48);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mestText);
};

BossBattle.prototype._updateUI = function() {
    //console.log("updateUI");
    this.mestText.setText("Hello");
    
};



