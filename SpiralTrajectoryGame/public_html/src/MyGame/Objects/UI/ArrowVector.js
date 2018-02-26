// This class uses mouse inputs and creates a UI element to 
// display the strength and angle that an arrow would be
// fired at.
class ArrowVector {
    constructor(maxLength, cameraRef) {
        if (maxLength > 1) {
            this.mMaxLength = maxLength;
        }
        else {
            this.mMaxLength = 10;
        }
        this.mCameraRef = cameraRef;
        this.mLineSet = [];
        this.mVisible = false;
        this.mColor = [1,1,1,1];
        
        this._initialize();
        
    }
    _initialize() {
        var i,l;
        for (i = 0; i < 3; i++) {
            l = new LineRenderable();
            l.setColor(this.mColor);
            this.mLineSet.push(l);
        }
    }
    
    // Private function for determing the length of the arrow vector
    _getDistance() {
        var p1 = this.mLineSet[0].getFirstVertex();
        var p2 = this.mLineSet[0].getSecondVertex();
        var pos1 = vec2.fromValues(p1[0], p1[1]);
        var pos2 = vec2.fromValues(p2[0], p2[1]);   
        return vec2.distance(pos1,pos2);
        
    }
    
    setColor(colorArray) {
        var i;
        this.mColor = colorArray;
        for (i = 0; i < 3; i++) {
            this.mLineSet[i].setColor(colorArray);

        }
    }
    
    // 0' defined by the direction of (1,0)
    // returns radian value
    getAngle() {
        var pos1 = this.mLineSet[0].getFirstVertex();
        var pos2 = this.mLineSet[0].getSecondVertex();
        var opp = pos1[1] - pos2[1];
        var adj = pos1[0] - pos2[0];
        var angle = Math.acos(adj/this._getDistance());
        if (opp < 0) {
            return angle * -1;
        }
        return angle;
    }
    
    // 0' defined by the direction of (1,0)
    // returns degree value
    getDegrees() {
        return this.getAngle() * 180/Math.PI;
    }
    
    // power is determined as a ratio of the length of the ArrowVector and its
    // max length.
    getPower() {
        var results = (this._getDistance()/this.mMaxLength);
        if (results > 1) {
            return 1;
        }
        else {
            return results;
        }
    }
    
    draw(aCamera) {
        if (this.mVisible) {
            var i, l;
            for (i = 0; i < this.mLineSet.length; i++) {
                l = this.mLineSet[i];
                l.draw(aCamera);
            }
        }
    }
    
    // Makes sure the line renderables are not longer than mMaxLength
    _truncateVector() {
        var dist = this._getDistance();
        if (dist > this.mMaxLength ) {
            dist = this.mMaxLength;
            var pos = this.mLineSet[0].getFirstVertex();
            var x = pos[0];
            var y = pos[1];
            var angle = this.getAngle()+Math.PI;
            x += (this.mMaxLength * Math.cos(angle));
            y += (this.mMaxLength * Math.sin(angle));
           this.mLineSet[0].setSecondVertex(x, y);
           this.setColor([1,0,0,1]);
        }
        else if (dist > 0) {
            var col = .7*dist/this.mMaxLength;
            this.setColor([1, 1 - col, 1 - col, 1]);
        }
        else {
            this.setColor([1,1,1,1]);
        }
    }
    
    _updateWings() {
        var basePos = this.mLineSet[0].getFirstVertex();
        this.mLineSet[1].setFirstVertex(basePos[0], basePos[1]);
        this.mLineSet[2].setFirstVertex(basePos[0], basePos[1]);
        var angle = this.getAngle() + 3*Math.PI/4;
        this.mLineSet[1].setSecondVertex(basePos[0] + 2*Math.cos(angle), basePos[1] + 2*Math.sin(angle));
        angle += Math.PI/2;
        this.mLineSet[2].setSecondVertex(basePos[0] + 2*Math.cos(angle), basePos[1] + 2*Math.sin(angle));
        
    }
    
    update() {
        var x, y;
        if (this.mCameraRef.isMouseInViewport()) {
            if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left) && this.mVisible == false) {
                x = this.mCameraRef.mouseWCX();
                y = this.mCameraRef.mouseWCY();
                this.mLineSet[0].setFirstVertex(x, y);
                this.mVisible = true;

            }
            if (this.mVisible && gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
                x = this.mCameraRef.mouseWCX();
                y = this.mCameraRef.mouseWCY();
                this.mLineSet[0].setSecondVertex(x, y);
                this._truncateVector();
                this._updateWings();
                
            }
            if (gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)) {
                this.mVisible = false;
                console.log("Arrow would fire with " + this.getPower()*100 + "% power");
                console.log("Arrow would fire at " + this.getDegrees() + "'");
                // TODO: Call firing function for arrows at this point
            }
        }
    }
}
