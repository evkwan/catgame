cc.Class({
    extends: cc.Component,

    properties: {
        fishPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        fishCount: {
            default: null,
            type: cc.Label
        },
        
        cat: {
            default: null,
            type: cc.Node
        },
        
        hearts: {
            default: null,
            type: cc.Node
        },
        
        leftKey: {
            default: null,
            type: cc.Node
        },
        
        rightKey: {
            default: null,
            type: cc.Node
        },
        
        consecutiveFishCount: 0,
        nextLvlUp: 0,
        lvlUpFactor: 2,
        spdUpFactor: 3,
        fishSpd: 0,
        initialFishSpd: 5,
        endGameCount: 50
    },

    // use this for initialization
    onLoad: function () {
        // Set fish count to 0
        this.fish = 0;
        this.fishCount.string = 'Fish eaten: 0';
        
        // Set fish properties
        this.nextLvlUp = this.lvlUpFactor;
        this.fishSpd = this.initialFishSpd;
        
        //Spawn a fish
        this.spawnNewFish();
        
        //Set Cat properties
        this.cat.getComponent('Cat').game = this;
        

    },

    spawnNewFish: function() {
        var newFish = cc.instantiate(this.fishPrefab);
        this.node.addChild(newFish);
        newFish.setPosition(this.getNewFishPosition());
        newFish.getComponent('Fish').game = this;
        newFish.getComponent('Fish').fishSpd = this.fishSpd;
    },
    
    getNewFishPosition: function() {
        //y is set in node config, randomise x-axis
        var startingY = (this.node.height/2) - 50;
        var maxX = this.node.width/2;
        var randX = cc.randomMinus1To1() * maxX;
        return cc.p(randX, startingY);
    },
    
    updateConsecutiveFishCount: function() {
        this.consecutiveFishCount += 1; 
        console.log("consecutiveFishCount is: " + this.consecutiveFishCount);
        if (this.consecutiveFishCount === this.nextLvlUp){
            this.fishSpd += this.spdUpFactor;
            this.nextLvlUp = this.consecutiveFishCount  + this.lvlUpFactor;
        }
    },
    
    resetConsecutiveFishCount: function() {
        this.consecutiveFishCount = 0;
        this.fishSpd = this.initialFishSpd;
        this.nextLvlUp = this.lvlUpFactor;
        this.removeAHeart();
    },
    
    updateFishCount: function() {
      this.fish += 1;
      this.fishCount.string='Fish eaten: ' + this.fish.toString();
    },
    
    removeAHeart: function() {
        //console.log("remaining hearts: " + this.hearts.length);

        this.hearts[this.hearts.length-1].opacity = 0;
        this.hearts.pop();
    },
    
    gameEnd: function() {
      this.cat.stopAllActions();
      cc.director.loadScene('gameover_good');
    },
    
    gameOver: function() {
        this.cat.stopAllActions();
        cc.director.loadScene('gameover_bad');
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.fish === this.endGameCount) { //End game! Pusheen has had 50 fishies!
            this.gameEnd();
        }
        
        if(this.hearts.length === 0) { //Out of hearts! game over. :(
            this.gameOver();
        }

    },
});
