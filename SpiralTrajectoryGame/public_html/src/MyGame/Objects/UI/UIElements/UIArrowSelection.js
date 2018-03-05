/* File: UIArrowSelection.js
 *      Displays the three arrow types, and whether they are
 *      Available or active
 */

function UIArrowSelection(sprites, borderSprite, position, iconSize) {
    this.mIconSize = iconSize;
    this.mBackdrop = new Renderable();
    this.mBackdrop.setColor([0, 0, 0, 1]);
    UIElement.call(this, 
                    this.mBackdrop, 
                    position, 
                    vec2.fromValues(iconSize * 3, iconSize));
    
    
    this.mArrows = [];
    var p = this.getUIXform().getPosition();
    var s = this.getUIXform().getSize();
    var leftEdge = p[0] - s[0]/2;
    var i;
    for(i = 0; i < sprites.length; i++) {
        var tpos = vec2.fromValues(leftEdge + iconSize/2 + i * iconSize, p[1]);
        var s = new UITexture(sprites[i], tpos, vec2.fromValues(iconSize, iconSize));
        this.mArrows.push(s);
    }
    
    this.mActiveBorder = new UITexture(borderSprite, null, vec2.fromValues(iconSize, iconSize));
    this.select(0);
};
gEngine.Core.inheritPrototype(UIArrowSelection, UIElement);

UIArrowSelection.prototype.draw = function(aCamera) {
    UIElement.prototype.draw(this, aCamera);
    
    var i;
    for(i = 0; i < this.mArrows.length; i++) {
        this.mArrows[i].draw(aCamera);
    }
    
    this.mActiveBorder.draw(aCamera);
};
/*
UIArrowSelection.prototype._applyUIXform = function(aCamera) {
    var camPos = aCamera.getWCCenter();
    var rendXform = this.getXform();
    var WCPos = aCamera.VPpixelPosToWC(this.mUIXform.getPosition());
    var WCSize = aCamera.VPpixelSizeVec2ToWC(this.mUIXform.getSize());
    rendXform.setPosition(WCPos[0], WCPos[1]);
    rendXform.setSize(WCSize[0], WCSize[1]);
    return;
    var i;
    for(i = 0; i < this.mArrows.length; i++) {
        this.mArrows[i].getUIXform().setPosition(leftEdge + this.mIconSize/2 + i * this.mIconSize, p[1]);
        this.mArrows[i].getUIXform().setSize(this.mIconSize, this.mIconSize);
    }
};
*/

UIArrowSelection.prototype.select = function(type) {
    var targetPos = this.mArrows[type].getUIXform().getPosition();
    this.mActiveBorder.mUIXform.setPosition(targetPos[0], targetPos[1]);
};


