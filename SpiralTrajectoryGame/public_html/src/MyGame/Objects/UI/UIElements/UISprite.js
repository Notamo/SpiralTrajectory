/* File: UISprite.js
 *      Sprite class for the UI
 */
"use strict";

function UISprite(sprite, position, size, pxPos) {
    this.mSprite = new SpriteRenderable(sprite);
    if(pxPos !== null)
        this.mSprite.setElementPixelPositions(pxPos[0], pxPos[1], pxPos[2], pxPos[3]);
    UIElement.call(this, this.mTex, position, size);
}
gEngine.Core.inheritPrototype(UISprite, UIElement);

UISprite.prototype.setElementPixelPositions = function(left, right, bottom, top) {
  this.mSprite.setElementPixelPositions(left, right, bottom, top);  
};