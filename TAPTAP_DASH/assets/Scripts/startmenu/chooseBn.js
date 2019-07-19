// 制作一个按钮渐次飞入的动画
cc.Class({

    extends: cc.Component,

    properties: {
    },
    onLoad() {
        this.LoadButtons()
    },
    start() {
    },
    LoadButtons: function() {
        this.dataBase = require('DataBase')

        this.easyBn = this.node.getChildByName('easyBn')
        this.normalBn = this.node.getChildByName('normalBn')
        this.hardBn = this.node.getChildByName('hardBn')
        this.speed = 12
        this.direct = 1
        this.gapBetweenBn = 0
    },
    // 外部接口，用于初始化三个选关按钮，传入初始坐标和终止坐标
    initButtons: function(sx, sy, fx) {

        cc.log('choice start')
            // 场景开始
        this.direct = Number(!!(fx - sx))
        this.fixedPosition = fx
        this.gapBetweenBn = this.easyBn.width / 2

        //初始化按钮的坐标和状态
        this.easyBn.active = true
        this.normalBn.active = true
        this.hardBn.active = true
        this.easyBn.setPosition(sx, sy)
        this.normalBn.setPosition(sx, sy - this.gapBetweenBn)
        this.hardBn.setPosition(sx, sy - this.gapBetweenBn * 2)

        var repeatTimes = (fx - sx) / this.speed
        var interval = 0.001

        this.easyBn.on('click',this.onClick_easy,this)
        this.normalBn.on('click',this.onClick_normal,this)
        this.hardBn.on('click',this.onClick_hard,this)

        // 让按钮从左侧依次飞入
        this.schedule(function() {
            this.updateEasyBn(this.easyBn)
        }, interval, repeatTimes, 0)
        this.schedule(function() {
            this.updateEasyBn(this.normalBn)
        }, interval, repeatTimes, 0.12)
        this.schedule(function() {
            this.updateEasyBn(this.hardBn)
        }, interval, repeatTimes, 0.24)
    },
    updateEasyBn: function(button) {
        if (button.active) {
            button.setPosition(button.x + this.speed * this.direct, button.y)
        }
    },
    hideButton: function() {
            // 回收资源
            this.easyBn.active = false
            this.normalBn.active = false
            this.hardBn.active = false
    },
    onClick_easy:function() {
        this.dataBase.HardDegree = 'easy'
        cc.director.loadScene('Game')
    },
    onClick_normal:function() {
        this.dataBase.HardDegree = 'normal'
        cc.director.loadScene('Game')
    },
    onClick_hard:function() {
        this.dataBase.HardDegree = 'hard'
        cc.director.loadScene('Game')
    }
});