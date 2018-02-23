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
        
        this.mLineSet[0].setVertices(0,0,-1 * this.mMaxLength, 0);
    }
    
    _getDistance() {
        var p1 = this.mLineSet[0].getFirstVertex();
        var p2 = this.mLineSet[0].getSecondVertex();
        var pos1 = vec2.fromValues(p1[0], p1[1]);
        var pos2 = vec2.fromValues(p2[0], p2[1]);   
        return vec2.distance(pos1,pos2);
        
    }
    
    // 0' defined by the direction of (1,0)
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
    
    getDegrees() {
        return this.getAngle() * Math.PI/180;
    }
    
    getPower() {
        var results = (this._getDistance()/this.mMaxLength) * 100
        if (results > 100) {
            return 100;
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
    
    _truncateVector() {
        if (this._getDistance() > this.mMaxLength ) {
            var pos = this.mLineSet[0].getFirstVertex();
            var x = pos[0];
            var y = pos[1];
            var angle = this.getAngle()+Math.PI;
            x += (this.mMaxLength * Math.cos(angle));
            y += (this.mMaxLength * Math.sin(angle));
           this.mLineSet[0].setSecondVertex(x, y);
        }
    }
    
    _updateWings() {
        var basePos = this.mLineSet[0].getFirstVertex();
        this.mLineSet[1].setFirstVertex(basePos[0], basePos[1]);
        this.mLineSet[2].setFirstVertex(basePos[0], basePos[1]);
        var angle = this.getAngle();
        this.mLineSet[1].setSecondVertex(basePos[0]-2, basePos[1] + 2);
        this.mLineSet[2].setSecondVertex(basePos[0]+ 2, basePos[1] - 2); 
        
    }
    
    update() {
        var x, y;
        if (true) {
        //if (this.mCamRef.isMouseInViewport()) {
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
                console.log("Power is " + this.getPower());
            }
        }
    }
}
