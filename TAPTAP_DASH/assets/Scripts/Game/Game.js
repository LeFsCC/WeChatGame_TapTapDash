

// 人物驱动


cc.Class({
    extends: cc.Component,

    properties: {
        scoreTxt: cc.RichText,
        timeTxt: cc.RichText
    },
    editor: {
        executionOrder: 0
    },
    onLoad() {
        this.initSource()
        this.registEventHandler()
    },
    start() {
        this.initGame()
    },
    // 绑定一些节点
    initSource: function() {
        this.background = this.node.getChildByName('background')
        this.gameCamera = this.node.getChildByName('gameCamera')
        this.scoreNode = this.node.getChildByName('score')
        this.ptimerNode = this.node.getChildByName('time')
        this.pauseBn = this.node.getChildByName('pauseBn')

        // 场景宏观变量
        this.sceneState = 'pause' // 当前场景处于暂停状态
        this.timeSpan = 0 // 已经经过的时间
        this.if_touch = false
    },
    // 刷新时间函数
    updateTime: function() {
        // 如果游戏不在运行中，就不再刷新
        if (!this.sceneState)
            return

        this.timeSpan += 1
        let minute = Math.floor(this.timeSpan / 60)
        let second = Math.floor(this.timeSpan % 60)
        let string1 = String(minute)
        let string2 = String(second)
        if (string1.length == 1) {
            string1 = '0' + string1
        }
        if (string2.length == 1) {
            string2 = '0' + string2
        }
        this.timeTxt.string = String('<color=#000000>' + string1 + '：' + string2 + '</color>')
    },
    // 初始化游戏并重新开始，所有属性归到初始状态
    initGame: function() {
        this.timeSpan = 0
            // TODO: 初始化道路和人物
        this.gameCamera.getComponent('Controller').launchGame()
        this.schedule(function() {
            this.updateTime()
        }, 1)
        this.schedule(function(){
            this.checkStatus()
        },0.01)
    },
    // 检查玩家是否失败
    checkStatus:function (){
        let if_lose = this.gameCamera.getComponent('Controller').checkLose()
        // TODO 如果失败, 游戏结束
    },
    // 暂停或回到游戏，地图和人物都不动
    pause_back_Game: function() {
        console.log('pause ')
        if (this.sceneState === true) {
            this.sceneState = false
            this.gameCamera.getComponent('Controller').pauseMap()
        } else {
            this.sceneState = true
            this.gameCamera.getComponent('Controller').restartMap()
        }
        this.pauseBn.getComponent('ChangePauseBn').changePic(this.sceneState)
    },
    // 改变camera 的角度，如果在修改camera角度的时候人物位置发生了异常，那么游戏结束
    changeRotation: function() {
        if (this.if_touch === false) {
            this.if_touch = true
            this.gameCamera.getComponent('Controller').RotateCamera()
        }
    },
    closeTouch: function() {
        this.if_touch = false
    },
    registEventHandler: function() {
        this.pauseBn.on('click', this.pause_back_Game, this)
        this.node.on('touchstart', this.changeRotation, this)
        this.node.on('touchend', this.closeTouch, this)
    }
});