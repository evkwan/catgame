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
        
        //Button width and height. Set manually as the getContentSize() is wonky!!!
        oriHeight: 128,
        oriWidth: 128,
        height: 250,
        width: 250
    },

    // use this for initialization
    onLoad: function () {
        cc.eventManager.addListener(this.getouchInputListener(), this.node);
        console.log(this);
    },

    getouchInputListener: function() {
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch,event){
                //console.log("touch begun1!");
                var target = event.getCurrentTarget();
                console.log(target);
                
                var locationInNode = target.convertToNodeSpace(touch.getLocation());	
		        var s = target.getContentSize();
		        console.log(JSON.stringify(locationInNode));
		        var rect = cc.rect(0, 0, this.width, this.height);
		        rect.x = -((this.width-this.oriWidth)/2);
		        rect.y = -((this.height-this.oriHeight)/2);

		        if (cc.rectContainsPoint(rect, locationInNode)) {
			        this.node.parent.getChildByName('cat').getComponent('Cat').accLeft=true;
                    this.node.parent.getChildByName('cat').getComponent('Cat').accRight = false;
			        return true
		        } else {
		           // console.log("didn't contain!");
		        }
		        return false;
	        }.bind(this),

            onTouchEnded: function(touch, event){
                //console.log("TouchEnded!1");
                var target = event.getCurrentTarget();
                this.node.parent.getChildByName('cat').getComponent('Cat').accLeft = false;
            }.bind(this),

        });
        
        return listener;
        
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
     },
});
