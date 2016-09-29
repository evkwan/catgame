cc.Class({
    extends: cc.Component,

    properties: {

        eatRadius: 100,
        fishSpd: 0
    },

    onEaten: function() {
        //console.log("fish speed is now: " + this.fishSpd);
        this.game.updateConsecutiveFishCount();
        this.game.spawnNewFish();
        this.game.updateFishCount();
        this.node.destroy();
    },
    
    moveFish: function() {
        var moveDown = new cc.MoveBy(1, cc.p(0,-this.fishSpd));
        return moveDown;
    },
    
    // use this for initialization
    onLoad: function () {
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        this.node.runAction(this.moveFish());
        
        //Fish got eaten by the cat!!
        var dist = cc.pDistance(this.node.position, this.game.cat.getPosition());
        if (dist < this.eatRadius) {
            this.onEaten();
            return;
        }
        
        // -269 is the group's central Y position
        // this means the fish moved past the ground!
        // Cat missed it, so let's destroy it
        if(this.node.y < -(this.game.node.height/2 - 80)){
            this.game.resetConsecutiveFishCount();
            this.game.spawnNewFish();
            this.node.destroy();
        }
    },
});
