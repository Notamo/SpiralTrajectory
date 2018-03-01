/* File: ArrowSet.js 
 *
 * Support for working with a set of Arrows
 */
class ArrowSet extends GameObjectSet {
    
    /**
    * Default Constructor
    * Support for working with a set of Arrows, including Ice & Fire Arrows
    * @returns {ArrowSet} New instance of ArrowSet
    * @class ArrowSet
    */
    constructor(){
        this.super();
        
        // { Regular : 0, Fire : 1, Ice : 2 }
        // Cooldowns (frames) for each type of arrow
        this.kCooldowns = [30, 300, 300];
        this.mTimeSinceSpawn = [0, 0, 0];
        // max count of each arrow type
        this.kMaxCount = [10, 4, 4];
        
        this.mRegArrows = new GameObjectSet();
        this.mFireArrows = new GameObjectSet();
        this.mIceArrows = new GameObjectSet();
    
    }
    
    /**
    * Add Arrow to this ArrowSet and a subset for specific arrow type
    * @param {GameObject} obj to add to this GameObjectSet
    * @returns {void}
    * @memberOf ArrowSet
    */
    addToSet(obj) {
        if (obj instanceof Arrow){
            var success = false;
            if (obj instanceof FireArrow) {
                if (this.mFireArrows.size() < this.kMaxCount[1] && this.mTimeSinceSpawn[1] < this.kCooldowns[1]) {
                    this.mFireArrows.addToSet(obj);
                    this.mTimeSinceSpawn[1] = 0;
                    success = true;
                }
            }
            else if (obj instanceof IceArrow) {
                if (this.mIceArrows.size() < this.kMaxCount[2] && this.mTimeSinceSpawn[2] < this.kCooldowns[2]) {
                    this.mIceArrows.addToSet(obj);
                    this.mTimeSinceSpawn[2] = 0;
                    success = true;
                }
            }
            else {
                if (this.mRegArrows.size() < this.kMaxCount[0] && this.mTimeSinceSpawn[0] < this.kCooldowns[0]) {
                    this.mIceArrows.addToSet(obj);
                    this.mTimeSinceSpawn[0] = 0;
                    success = true;
                }
            }
            if (this.size() < this.kMaxCount.reduce((accumulator, currentValue) => accumulator + currentValue) && success) {
                super.addToSet(obj);
            }
        }
    }
    
    /**
    * Return the count of Arrows in set
    * @returns {Number} count of Arrows in set
    * @memberOf ArrowSet
    */
    size() {
        var sum = 0;
        sum += this.mRegArrows.size();
        sum += this.mFireArrows.size();
        sum += this.mIceArrows.size();
        return sum;
    }
    
    /**
    * Remove Arrow from ArrowSet & subsets
    * @param {GameObject} obj to remove from GameObjectSet
    * @returns {void}
    * @memberOf GameObjectSet
    */
    removeFromSet(obj) {
        this.mRegArrows.removeFromSet(obj);
        this.mFireArrows.removeFromSet(obj);
        this.mIceArrows.removeFromSet(obj);
        super.removeFromSet(obj);
    }
    
    /**
    * Update function called by GameLoop calls all Arrows's in ArrowSet
    * Will remove expired arrows from the set.
    * @returns {void}
    * @memberOf ArrowSet
    */
    update() {
        super.update();
        var i;
        for (i = 0; i < this.mTimeSinceSpawn.length; i++) {
            this.mTimeSinceSpawn[i]++;
        }
        var size = this.size();
        var arrow = null;
        for (i = 0; i < size; i++) {
            arrow = this.getObjectAt(i);
            if (arrow.getDeath()) {
                this.removeFromSet(arrow);
            }
        }
    }
}