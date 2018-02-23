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
        var adj = pos1[0] - pos1[0];
        var angle = Math.atan(opp/adj);
        console.log(angle * (180/Math.PI));
        return angle * (180/Math.PI);
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
    
    _updateWings() {
        var basePos = this.mLineSet[0].getFirstVertex();
        var angle = this.getAngle();
        
        
    }
    
    update() {
        if (this.mCamRef.isMouseInViewport()) {
            
        }
    }
}
