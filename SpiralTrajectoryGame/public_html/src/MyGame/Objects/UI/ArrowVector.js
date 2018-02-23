class ArrowVector {
    constructor(maxLength, cameraRef) {
        this.mMaxLength = maxLength;
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
        var p = this.getXform().getPosition();
        var pos1 = vec2.fromValues(p[0], p[1]);
        var pos2 = vec2.fromValues(this.mCamRef.mouseWCX(), this.mCamRef.mouseWCY());   
        return vec2.distance(pos1,pos2);
        
    }
    
    getAngle() {
        
    }
    
    getPower() {
        
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
    
    update() {
        
    }
}
