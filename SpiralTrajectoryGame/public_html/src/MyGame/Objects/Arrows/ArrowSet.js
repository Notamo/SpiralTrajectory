class ArrowSet extends GameObjectSet {
    constructor(){
        this.super();
        
        // { Regular : 0, Fire : 1, Ice : 2 }
        // Cooldowns (frames) for each type of arrow
        this.kCooldowns = [30, 600, 300];
        // max count of each arrow type
        this.kMaxCount = [10, 4, 2];
        
        this.mRegArrows = [];
        this.mFireArrows = [];
        this.mIceArrows = [];
    }
    
    
}