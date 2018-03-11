/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

function UIButton(buttonSprite, camera, callback, position, size, text, textSize) {
    this.mBack = new SpriteRenderable(buttonSprite);
    this.mBack.setElementUVCoordinate(0.0, 1.0, 0.5, 1.0);
    UIElement.call(this, this.mBack, position, size);
    
    
    var textPos = vec2.fromValues(position[0] - size[0] / 2, 
                                  position[1]);
    this.mText = new UIText(text, textPos, textSize);
    
    this.mCallBack = callback;
    this.mCamera = camera;
    this.mHover = false;
    this.mClick = false;
}
gEngine.Core.inheritPrototype(UIButton, UIElement);

UIButton.prototype.getText = function() {
    return this.mText;
};

UIButton.prototype.draw = function (aCamera) {
    UIElement.prototype.draw.call(this, aCamera);
    this.mText.draw(aCamera);
};


UIButton.prototype.update = function () {
    UIElement.prototype.update.call(this);

    var xform = this.getXform();

    //this.mText.getUIXform().setPosition(xform.getXPos() - xform.getWidth() / 2, 
      //                            xform.getYPos());
    
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                gEngine.Input.getMousePosY());
    var mouseOver = this.getUIBBox().containsPoint(mousePos[0], mousePos[1]);
    //hover
    

    //start simple, just do callback when clicked
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(mouseOver){
            this.mClick = true;
            this.mBack.setElementUVCoordinate(0.0, 1.0, 0.0, 0.5);
        }
    }
    
    if(gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)){
        this.mClick = false;
        this.mBack.setElementUVCoordinate(0.0, 1.0, 0.5, 1.0);
        if(mouseOver){
            this.mCallBack.call(this);
        }
    }
};
