cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        
        //Time for the cat to move
        moveDuration: 0,
    
        //Move speed
        moveSpd: 15,
        
        //Car's scale. Required to do flipping correctly.
        scale: 0.6
    },

    // use this for initialization
    onLoad: function () {
        this.accLeft = false;
        this.accRight = false;
        this.setInputControl();
    },

    //function to attach event listener
    setInputControl: function() {
      var self = this;
      
      cc.eventManager.addListener({
          event: cc.EventListener.KEYBOARD,
          
          onKeyPressed: function(keyCode, event) {
            switch(keyCode) {
              case cc.KEY.left:
                  self.accLeft = true;
                  self.accRight = false;
                  break;
              case cc.KEY.right:
                  self.accRight = true;
                  self.accLeft = false;
                  break;
            }
          },
          
          onKeyReleased: function(keyCode, event) {
              switch(keyCode) {
                  case cc.KEY.left:
                      self.accLeft = false;
                      break;
                  case cc.KEY.right:
                      self.accRight = false;
                      break;
              }
          }
      }, self.node);
    },
    
    //Calculates the max move the cat can go in half a plane
    getPositionToMove: function () {
        //The max a cat can go is when it's head touches the boarder.
        var maxX = this.game.node.width/2 - ((this.node.width/2)-50) ; //50 here is padding allowance...
        var move = 0;
        //take into account the width of the cat
        if ((Math.abs(this.node.x)  + this.moveSpd) <= (maxX)) {
            move = this.moveSpd;
        } else {
            // will be equal to whatever is left.
            move = maxX - Math.abs(this.node.x);
        }

        
        return move;
    },
    
    //function to define an action to move right:
    moveRightAction: function() {
        var move = 0;
        
        if(this.node.x <= 0) { //still in the negative plane (left side.) can move right
            move = this.moveSpd;
        } else {
            move = this.getPositionToMove();
        }
        var moveRight = new cc.MoveBy(this.moveDuration, cc.p(move,0));
        return moveRight;
    },
    
    //function to define an action to move left:
    moveLeftAction: function() {
        var move = 0;

         if(this.node.x  >= 0) { //still in the positive plane (right side.) can move left
            move = this.moveSpd;
        } else {
            move = this.getPositionToMove();
        }
        var moveLeft = new cc.MoveBy(this.moveDuration, cc.p(-move,0));
        return moveLeft;
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        

        if(this.accRight){
            if(this.node.scaleX !== -this.scale ) {
                this.node.scaleX = -this.scale
            }
            this.node.runAction(this.moveRightAction());
        }
        if(this.accLeft){
            if (this.node.scaleX !== this.scale) {
                this.node.scaleX = this.scale
            }
            this.node.runAction(this.moveLeftAction());
        }
    },
});
