
// 路径驱动
cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: -2
    },
    properties: {
        pathElement: {
            default: null,
            type: cc.Prefab
        },
        starElement: {
            default : null,
            type : cc.Prefab
        }
    },
    onLoad() {
        // 定义一些地图场景的参数
        this.blocks = []
        this.direct = ''
        this.Ybias = 0
        this.Xbias = 0
       
        this.index = 0
        this.speed = 0.026
        this.formerdirect = 'vertical'
        this.camera = this.node.parent
        this.camera.setRotation(0)
        // 计数器
        this.count = 0
        // 目前的游戏状态
        this.GameStatus = true
    },
    // 如果返回false， 游戏直接结束，如果返回数值，那么旋转角度
    getnextRotation: function () {
        // 已到达边界
        if (this.index === this.blocks.length - 1) {
            return 0
        }
        this.HanderDirect(this.index)

        let direct0 = this.blocks[this.index].direct
        let direct1 = this.blocks[this.index + 1].direct

        if (direct0 === 'vertical' && direct1 === 'vertical') return 0
        if (direct0 === 'right' && direct1 === 'right') return -45
        if (direct0 === 'left' && direct1 === 'left') return 45

        if (direct0 === 'vertical' && direct1 === 'left')
            return 45
        if (direct0 === 'vertical' && direct1 === 'right')
            return -45
        if (direct0 === 'left' && direct1 === 'vertical')
            return -45
        if (direct0 === 'right' && direct1 === 'vertical')
            return 45
    },
    checkPosition: function () {
        
    },
    // 返回此时的方向
    requireDirect: function () {
        if (this.index >= this.blocks.length) {
            return 'vertical'
        } else {
            if (!this.blocks[this.index].exist && (this.blocks[this.index].direct === 'right'))
                return 'jumpXP'
            else if (!this.blocks[this.index].exist && (this.blocks[this.index].direct === 'left'))
                return 'jumpXM'
            else if (!this.blocks[this.index].exist)
                return 'jumpY'
            else if (this.index > 0 && !this.blocks[this.index - 1].exist && (this.blocks[this.index - 1].direct === 'right'))
                return 'jumpXP'
            else if (this.index > 0 && !this.blocks[this.index - 1].exist && (this.blocks[this.index - 1].direct === 'left'))
                return 'jumpXM'
            else if (this.index > 0 && !this.blocks[this.index - 1].exist)
                return 'jumpY'
            else if (!this.blocks[this.index + 1].exist && (this.blocks[this.index + 1].direct === 'right'))
                return 'jumpXP'
            else if (!this.blocks[this.index + 1].exist && (this.blocks[this.index + 1].direct === 'left'))
                return 'jumpXM'
            else if (!this.blocks[this.index + 1].exist)
                return 'jumpY'

            return this.blocks[this.index + 1].direct
        }
    },
    requireExist:function() {
        if(this.index === this.blocks.length - 1) {
            return 'end'
        }
        return this.blocks[this.index - 1 ].exist
    },
    // 被父节点调用的接口，用来控制地图的移动
    launchGame: function (hardDegree) {
        this.node.setPosition(0, 0)
        this.Ybias = -25
        this.Xbias = 0
        this.RotaBias = 0
        this.index = 0
        this.speed = 0.02
        this.formerdirect = 'vertical'
        if(hardDegree === 'easy'){
            this.blocks = require('pathSource').blocks(200,'easy')
            this.speed = 0.024
        } else if(hardDegree === 'normal'){
            this.blocks = require('pathSource').blocks(300,'normal')
            this.speed = 0.02
        } else if(hardDegree === 'hard') {
            this.blocks = require('pathSource').blocks(300,'hard')
            this.speed = 0.018
        }
        this.camera.setRotation(0)
        this.LoadPath()
    },
    changeStatus: function (sta) {
        this.GameStatus = sta
    },
    // 加载地图
    LoadPath: function () {
        let initCount = this.blocks.length
        for (let i = 0; i < initCount; i++) {
            let pathBlock = cc.instantiate(this.pathElement)

            this.node.addChild(pathBlock)
            let star = cc.instantiate(this.starElement)

            // 添加星星
            if (this.blocks[i].hasStar) {
                pathBlock.addChild(star)
                pathBlock.children[0].setPosition(0, 0)
                pathBlock.children[0].getComponent(cc.Animation).play()
            }
            

            if (!this.blocks[i].exist) {
                this.node.children[i].setScale(0)
            }
            pathBlock.setPosition(this.blocks[i].x, this.blocks[i].y)
            
        }
        this.HanderDirect(this.index)

        this.schedule(function () {
            if (this.GameStatus === false)
                return
            this.changePosition()
        }, this.speed)
    },
    getPosition: function () {
        if (this.index === this.blocks.length)
            return null
        let position = {
            x: this.blocks[this.index].x,
            y: this.blocks[this.index].y
        }
        return position
    },
    changeIndex: function () {
    },
    // 让地图动起来
    runPath: function (idx) {
        if(this.node.children[idx].children.length != 0){
            this.node.children[idx].children[0].active = false
            this.node.parent.parent.getChildByName('score').getComponent('RecordScore').updateScore()
        }
        this.count = 0
    },
    HanderDirect: function (idx) {
        this.direct = this.blocks[idx].direct
        if (this.blocks[idx + 1].direct === 'vertical') {
            this.Ybias = -25
            this.Xbias = 0
        }
        if (this.blocks[idx + 1].direct === 'right') {
            this.Ybias = 0
            this.Xbias = -25
        }
        if (this.blocks[idx + 1].direct === 'left') {
            this.Ybias = 0
            this.Xbias = 25
        }
        this.formerdirect = this.direct
    },
    changePosition: function () {
        // 游戏暂停
        if (this.GameStatus === false)
            return
        if (this.count < 10) {
            this.count += 1
            this.node.setPosition(this.node.x + this.Xbias, this.node.y + this.Ybias)
        } else {
            
            if(this.index < this.blocks.length - 1)
               this.runPath(this.index++)
            // 砖块走完游戏结束
            else
              this.GameStatus = false
        }
    }
});