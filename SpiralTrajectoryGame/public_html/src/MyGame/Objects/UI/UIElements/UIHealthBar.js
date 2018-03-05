/* UIHealthBar.js
 * 
 */

"use strict";

function UIHealthBar(sprite, position, size, buffer) {
    this.mBack = new SpriteRenderable(sprite);
    this.mBack.setElementUVCoordinate(0.0, 1.0, 0.5, 1.0);
    UIElement.call(this, this.mBack, position, size);
    
    this.mBuffer = buffer;
    
    this.mMaxHP = 100;
    this.mCurHP = 40;
    
    
    this.mHPElem = new UISprite(sprite, position, size, [0.0, 1.0, 0.0, 0.5]);
};
gEngine.Core.inheritPrototype(UIHealthBar, UIElement);

UIHealthBar.prototype.draw = function(aCamera) {
  UIElement.prototype.draw.call(this, aCamera);
  this.mHPElem.draw(aCamera);
};

UIHealthBar.prototype.update = function() {
    UIElement.prototype.update.call(this);
    
    var s = this.getUIXform().getSize();
    this.mHPElem.getUIXform().setSize((s[0] - 2*this.mBuffer) * (this.mCurHP / this.mMaxHP), s[1] - 2*this.mBuffer);
    
    this.mHPElem.update();
};

UIHealthBar.prototype.setMaxHP = function(hp) {
  this.mMaxHP = hp;  
};

UIHealthBar.prototype.setCurrentHP = function(hp) {
    this.mCurHP = hp;
}
