/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

BossBattle.prototype._initializeUI = function() {    
    this.mTestText = new UIText("Player Health:", vec2.fromValues(25, 780), null);
    this.mTestText.setTextHeight(4);
    var arrowSelectSprites = [Config.UI.Textures.UIArrowIcon,
                              Config.UI.Textures.UIFireArrowIcon,
                              Config.UI.Textures.UIIceArrowIcon];
                         
    this.mArrowSelector = new UIArrowSelection(arrowSelectSprites, Config.UI.Textures.UIArrowBorders, vec2.fromValues(150, 850), 100);
    
    this.mBossName = new UIText(Config.UI.BossName.Text, 
                                Config.UI.BossName.Position, null);
    this.mBossName.setColor(Config.UI.BossName.Color);
    this.mBossName.setTextHeight(Config.UI.BossName.TextHeight);
    this.mBossHP = new UIHealthBar(Config.UI.Textures.UIHealthBar,
                               Config.UI.BossHealthBar.Position,
                               Config.UI.BossHealthBar.Size,
                               Config.UI.BossHealthBar.Buffer);
    this.mBossHP.setMaxHP(this.mBoss.mMaxHP);
    this.mBossHP.setCurrentHP(this.mBoss.mCurrentHP);

    this.mHeroHP = new UIHealthBar(Config.UI.Textures.UIHealthBar,
                               Config.UI.HeroHealthBar.Position,
                               Config.UI.HeroHealthBar.Size,
                               Config.UI.HeroHealthBar.Buffer);
    this.mHeroHP.setMaxHP(this.mHero.mMaxHP);
    this.mHeroHP.setCurrentHP(this.mHero.mCurrentHP);
                               
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mTestText);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mArrowSelector);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mBossName)
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mBossHP);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mHeroHP);
};

BossBattle.prototype._updateUI = function() {
    this.mArrowSelector.select(this.mHero.getArrowSelection());
    var cooldowns = this.mHero.mArrowSet.getCooldownStatus();
    for(var i = 0; i < cooldowns.length; i++)
        this.mArrowSelector.setActive(i, cooldowns[i]);
    
    if(this.mBoss !== null)
        this.mBossHP.setCurrentHP(this.mBoss.mCurrentHP);
    else
        this.mBossHP.setCurrentHP(0);
    
    this.mHeroHP.setCurrentHP(this.mHero.mCurrentHP);
};



