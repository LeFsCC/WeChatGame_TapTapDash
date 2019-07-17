cc.Class({
    extends: cc.Component,

    properties: {
        pathElement: {
            default: null,
            type: cc.Prefab
        }
    },
    onLoad() {
        cc.log('init path')
            // 定义一些地图场景的参数
        this.blocks = require('pathSource').blocks
        this.direct = ''
            // 如果方向是横向的，那么xbias 和 ybias 增量是方块增量的 1 / sqrt(2) 倍
        this.Ybias = 0
        this.Xbias = 0
        this.RotaBias = 0
        this.index = 0
        this.speed = 0.3

        this.formerdirect = 'vertical'
        this.camera = this.node.parent
        this.camera.setRotation(0)

        // 计数器
        this.count = 0
        this.LoadPath()
    },
    start() {},
    // 加载地图
    LoadPath: function() {
        let initCount = this.blocks.length
        cc.log(initCount)
        for (let i = 0; i < initCount; i++) {
            let pathBlock = cc.instantiate(this.pathElement)
            if (this.blocks[i].exist) {
                this.node.addChild(pathBlock)
            }
            pathBlock.setPosition(this.blocks[i].x, this.blocks[i].y)
        }
        this.schedule(function() {
            this.runPath(this.index++)
        }, this.speed)
        this.schedule(function() {
            this.changePosition()
        }, this.speed / 10 - 0.004)
        this.schedule(function() {
            this.changeRotation()
        }, this.speed / 10 - 0.004)
    },
    // 让地图动起来
    runPath: function(idx) {
        if (idx >= this.blocks.length) {
            this.unschedule(this.runPath)
            return
        }
        this.direct = this.blocks[idx].direct
        this.count = 0
        if (this.blocks[idx].direct === 'vertical') {
            this.Ybias = -25
            this.Xbias = 0
            if (this.formerdirect === 'right')
                this.RotaBias = -4.5
            else if (this.formerdirect === 'left')
                this.RotaBias = 4.5
            else
                this.RotaBias = 0
        }
        if (this.blocks[idx].direct === 'right') {
            this.Ybias = 0
            this.Xbias = -25
            if (this.formerdirect === 'vertical') this.RotaBias = 4.5
            else this.RotaBias = 0
        }
        if (this.blocks[idx].direct === 'left') {
            this.Ybias = 0
            this.Xbias = 25
            if (this.formerdirect === 'vertical') this.RotaBias = -4.5
            else this.RotaBias = 0
        }
        this.formerdirect = this.direct
    },
    changePosition: function() {
        if (this.count < 10) {
            this.count += 1
            this.node.setPosition(this.node.x + this.Xbias, this.node.y + this.Ybias)
        }
    },
    changeRotation: function() {
        if (this.count < 10) {
            this.camera.setRotation(this.camera.rotation + this.RotaBias)
        }
    }
});