cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: -2
    },
    properties: {
        pathElement: {
            default: null,
            type: cc.Prefab
        }
    },

    onLoad() {
        // 定义一些地图场景的参数
        this.blocks = require('pathSource').blocks
        this.direct = ''

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
            // 目前的游戏状态
        this.GameStatus = true
    },
    // 如果返回false， 游戏直接结束，如果返回数值，那么旋转角度
    getnextRotation: function() {
        // 已到达边界
        if (this.index === this.blocks.length - 1) {
            return 0
        }
        let direct0 = this.blocks[this.index - 1].direct
        let direct1 = this.blocks[this.index].direct

        if (direct0 === 'vertical' && direct1 === 'left')
            return 45
        if (direct0 === 'vertical' && direct1 === 'vertical')
            return -45
        if (direct0 === 'left' && direct1 === 'vertical')
            return -45
        if (direct0 === 'right' && direct1 === 'vertical')
            return 45
        return 0
    },
    // 被父节点调用的接口，用来控制地图的移动
    launchGame: function() {
        this.node.setPosition(0, 0)
        this.Ybias = 0
        this.Xbias = 0
        this.RotaBias = 0
        this.index = 0
        this.speed = 0.3
        this.formerdirect = 'vertical'
        this.camera.setRotation(0)
        this.LoadPath()
    },
    changeStatus: function(sta) {
        this.GameStatus = sta
    },
    // 加载地图
    LoadPath: function() {
        let initCount = this.blocks.length
        for (let i = 0; i < initCount; i++) {
            let pathBlock = cc.instantiate(this.pathElement)
            if (this.blocks[i].exist) {
                this.node.addChild(pathBlock)
            }
            pathBlock.setPosition(this.blocks[i].x, this.blocks[i].y)
        }

        this.schedule(function() {
            if (this.GameStatus === false)
                return
            this.runPath(this.index++)
        }, 0.4)
        this.schedule(function() {
            if (this.GameStatus === false)
                return
            this.changePosition()
        }, this.speed / 10 - 0.004)
    },
    getPosition: function() {
        if (this.index === this.blocks.length)
            return null
        let position = {
            x: this.blocks[this.index].x,
            y: this.blocks[this.index].y
        }
        return position
    },
    // 让地图动起来
    runPath: function(idx) {
        // 游戏暂停
        if (idx >= this.blocks.length) {
            this.unschedule(this.runPath)
            return
        }
        this.direct = this.blocks[idx].direct
        this.count = 0
        if (this.blocks[idx].direct === 'vertical') {
            this.Ybias = -25
            this.Xbias = 0
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
        }
        this.formerdirect = this.direct
    },
    changePosition: function() {
        // 游戏暂停
        if (this.GameStatus === false)
            return
        if (this.count < 10) {
            this.count += 1
            this.node.setPosition(this.node.x + this.Xbias, this.node.y + this.Ybias)
        }
    }
});