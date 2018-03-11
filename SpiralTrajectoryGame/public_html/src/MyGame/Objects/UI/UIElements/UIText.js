/* File: UIText
 * A UI Element that renders a FontRenderable
 */

"use strict";

function UIText(text, position, size) {
    this.mFontRenderable = new FontRenderable(text);
    this.mFontRenderable.setColor([0, 0, 0, 1]);
    this.mFontRenderable.setTextHeight(size);
    UIElement.call(this, this.mFontRenderable, position, null);
};
gEngine.Core.inheritPrototype(UIText, UIElement);

UIText.prototype.setColor = function (c) {
    this.mFontRenderable.setColor(c);
};

UIText.prototype.getColor = function() {
    return this.mFontRenderable.getColor();
};

UIText.prototype.setText = function (t) {
    this.mFontRenderable.setText(t);
};

UIText.prototype.setTextHeight = function (h) {
    this.mFontRenderable.setTextHeight(h);
};

UIText.prototype._applyUIXform = function(aCamera) {
    var camPos = aCamera.getWCCenter();
    var rendXform = this.getXform();
    var WCPos = aCamera.VPpixelPosToWC(this.mUIXform.getPosition());
    var WCSize = aCamera.VPpixelSizeToWC(this.mUIXform.getSize());
    rendXform.setPosition(WCPos[0], WCPos[1]);
    //rendXform.setSize(WCSize[0], WCSize[1]);
};