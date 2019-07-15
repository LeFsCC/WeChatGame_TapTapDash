cc.Class({
    extends: cc.Component,

    properties: {
       pathElement : {
           default : null,
           type : cc.Prefab
       }
    },
    onLoad() {
        cc.log('init path')
        // 定义一些地图场景的参数
        this.blocks = require('pathSource').blocks
        this.direct  = ''
        // 如果方向是横向的，那么xbias 和 ybias 增量是方块增量的 1 / sqrt(2) 倍
        this.Ybias = 0
        this.Xbias = 0
        this.index = 0
        this.camera = this.node.parent
        this.camera.setRotation(0)
        this.LoadPath()
    },
    start () {
    },
    // 加载地图
    LoadPath: function() {
        let initCount = this.blocks.length
        cc.log(initCount)
        for(let i = 0; i < initCount; i++) {
            let pathBlock = cc.instantiate(this.pathElement)
            this.node.addChild(pathBlock)
            pathBlock.setPosition(this.blocks[i].x, this.blocks[i].y)
        }
        this.schedule(function(){
            this.runPath(this.index++)
        },0.1)
    },
    // 让地图动起来
    runPath:function(idx) {
       if(idx >= this.blocks.length) {
             this.unschedule(this.runPath)
             return 
         }
        this.direct = this.blocks[idx].direct
       if(this.blocks[idx].direct === 'vertical'){
           this.Ybias = -250
           this.Xbias = 0
       }
       if(this.blocks[idx].direct === 'right'){
           this.Ybias = 0
           this.Xbias = -250
       }
       if(this.blocks[idx].direct === 'left'){
           this.Ybias = 0
           this.Xbias = 250
       }
       // 更新位置
        this.node.setPosition(this.node.x + this.Xbias,this.node.y + this.Ybias)
        if(this.direct === 'vertical' && this.camera.rotation != 0 )
           this.camera.setRotation(0)
        if(this.direct === 'left' && this.camera.rotation != 45)
           this.camera.setRotation(45)
        if(this.direct === 'right' && this.camera.rotation != -45)
           this.camera.setRotation(-45)
    }
    // update() {
        
    // }
});
