/* File: UIElement.js
 *      A GameObject that represents a single UI Element
 *      MUST be given a renderable from a child class to work
 */

function UIElement(renderable, name) {
    this.mName = name;
    this.mVisible = true;
    //canvas transform
    this.mUIXform = new Transform();
    this.mRenderable = renderable;
    this.mRenderable.getXform().setZPos(3);
    GameObject.call(this, this.mRenderable);
};
gEngine.Core.inheritPrototype(UIElement, GameObject);

UIElement.prototype.getUIXform = function() {
    return this.mUIXform;
};

UIElement.prototype.draw = function(aCamera) {
    if(this.mVisible) {
        this._applyUIXform(aCamera);
        GameObject.prototype.draw.call(this, aCamera);
    }
};

UIElement.prototype._applyUIXform = function(aCamera) {
    var camPos = aCamera.getWCCenter();
    var rendXform = this.getXform();

    var WCPos = vec2.fromValues(0, 0);
    WCPos[0] = camPos[0] + this.mUIXform.getXPos() * aCamera.getWCWidth();
    WCPos[1] = camPos[1] + this.mUIXform.getYPos() * aCamera.getWCHeight();
    
    rendXform.setPosition(WCPos[0], WCPos[1]);
};

UIElement.prototype.update = function() {
    GameObject.prototype.update.call(this);
};

UIElement.prototype.setVisible = function(visible) {
    this.mVisible = visible;
};