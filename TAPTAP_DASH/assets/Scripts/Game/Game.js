// 人物驱动
cc.Class({
    extends: cc.Component,

    properties: {
        timeTxt: cc.RichText,
        starElement: {
            default: null,
            type: cc.Prefab
        }
    },
    editor: {
        executionOrder: 0
    },
    onLoad() {
        this.data = this.node.getChildByName('getData').getComponent('GameData')
        this.initSource()
        this.registEventHandler()
    },
    start() {
        this.initGame()
    },
    // 绑定一些节点
    initSource: function () {
        this.background = this.node.getChildByName('background')
        this.gameCamera = this.node.getChildByName('gameCamera')
        this.scoreNode = this.node.getChildByName('score')
        this.ptimerNode = this.node.getChildByName('time')
        this.pauseBn = this.node.getChildByName('pauseBn')
        this.gameHint = this.node.getChildByName('GameHint').getComponent('GameHint')
        this.ResultPage = this.node.getChildByName('GameResultPage').getComponent('GameResultPage')
        // 场景宏观变量
        this.sceneState = true // 当前场景处于暂停状态
        this.timeSpan = 0 // 已经经过的时间
        this.if_touch = false
        this.GameResult = 'start' // 'lose', 'win'、
        // 飞动的星星是否存在
        this.starExist = false
    },
    // 刷新时间函数
    updateTime: function () {
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
    initGame: function () {
        this.timeSpan = 0
        // 初始化道路和人物
        let playerIndex = this.data.requirePlayerChoice()
        let hardDegree = this.data.requireHardDegree()
        this.gameCamera.getComponent('Controller').launchGame(playerIndex, hardDegree)
        this.node.getChildByName('GameResultPage').active = false

        // 刷新时间
        this.schedule(function () {
            this.updateTime()
        }, 1)
        // 开始计时
        this.schedule(function () {
            this.startCheckStatus()
        }, 0.01, 200, 1)
        // 星星飞动
        this.schedule(function () {
            this.flyStar()
        }, 0.02)
    },
    // 游戏开始一秒以后开始进行碰撞检测
    startCheckStatus: function () {
        this.schedule(function () {
            this.checkStatus()
        }, 0.017)
    },
    // 检查玩家是否失败
    checkStatus: function () {
        let if_lose = this.gameCamera.getComponent('Controller').checkLose()
        // TODO 游戏结束
        if (if_lose === false || if_lose === 'end') {
            this.sceneState = false
            this.gameCamera.getComponent('Controller').pauseMap()
            if (this.GameResult === 'start') {
                this.schedule(function () {
                    if (if_lose === false) {
                        this.gameHint.playLoseHint()
                    } else {
                        this.gameHint.playWinHint()
                    }
                }, 0.1, 1, 1)
                this.schedule(function () {
                    this.to_GameResultPage()
                }, 0.1, 1, 1.5)
            }
            if (if_lose === false) {
                this.GameResult = 'lose'
            } else {
                this.GameResult = 'win'
            }
            this.unschedule(this.checkStatus)
        }
    },
    // 暂停或回到游戏，地图和人物都不动
    pause_back_Game: function () {
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
    changeRotation: function () {
        if (this.if_touch === false) {
            this.if_touch = true
            this.gameCamera.getComponent('Controller').RotateCamera()
        }
    },
    // 关闭触摸事件
    closeTouch: function () {
        this.if_touch = false
    },
    // 注册一些事件
    registEventHandler: function () {
        this.pauseBn.on('click', this.pause_back_Game, this)
        this.node.on('touchstart', this.changeRotation, this)
        this.node.on('touchend', this.closeTouch, this)
    },
    // 转换到游戏结算场景
    to_GameResultPage: function () {
        this.pauseBn.off('click', this.pause_back_Game, this)
        this.node.off('touchstart', this.changeRotation, this)
        this.node.off('touchend', this.closeTouch, this)
        this.node.getChildByName('GameResultPage').active = true
        this.ResultPage.initStar()
    },
    // 产生星星
    produceNewStar: function () {
        let star = cc.instantiate(this.starElement)
        star.name = String('CanvasStar')
        this.node.addChild(star)
        star.setPosition(0, 0)
    },
    // 让星星飞动
    flyStar: function () {
        var star = this.node.getChildByName("CanvasStar")
        if (star) {
            if (star.x > -453 && star.y < 845) {
                star.setPosition(star.x - 25, star.y + 42)
            } else {
                this.node.removeChild(star)
            }
        }
    }
});
