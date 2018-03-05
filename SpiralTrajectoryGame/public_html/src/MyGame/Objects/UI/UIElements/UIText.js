/* File: UIText
 * A UI Element that renders a FontRenderable
 */

"use strict";

function UIText(text) {
    this.mFontRenderable = new FontRenderable(text);
    this.mFontRenderable.setColor([1, 0, 0, 1]);
    this.mFontRenderable.getXform().setPosition(37,35);
    this.mFontRenderable.setTextHeight(10);
    UIElement.call(this, this.mFontRenderable);
};
gEngine.Core.inheritPrototype(UIText, UIElement);

UIText.prototype.setText = function (t) {
    this.mFontRenderable.setText(t);
};

UIText.prototype.setTextHeight = function (h) {
    this.mFontRenderable.setTextHeight(h);
};

