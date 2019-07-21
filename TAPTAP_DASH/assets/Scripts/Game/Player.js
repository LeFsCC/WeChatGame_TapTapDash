// 人物驱动


cc.Class({
    extends: cc.Component,
    properties: {

    },
    onLoad() {
        // 人物静止，永远不动
        this.path = this.node.parent.getChildByName('path')
        this.playerPosition = {
            x: this.node.x - this.path.x,
            y: this.node.y - this.path.y
        }
        this.player = this.getComponent(cc.Animation)
        this.player.play('lqh')

        // 正在跳高
        this.jumpStart = false
        // 跳跃结束
        this.jumpend = false
        // Y向跳跃
        this.AxisY = false
        this.AxisXM = false
        this.AxisXP = false

        this.tempAxisY = false
        this.tempAxisXM = false
        this.tempAxisXP = false

        this.jumpSpan = 275
        this.timeSpan = 0.028
        this.node.setScale(1.3)
    },
    choosePlayer: function (playerIndex, hardDegree) {
        this.player.pause()
        switch (playerIndex) {
            case 0:
                this.player.play('txy')
                break
            case 1:
                this.player.play('bzt')
                break
            case 2:
                this.player.play('gfr')
                break
            case 3:
                this.player.play('ldz')
                break
            case 4:
                this.player.play('lqh')
                break
            case 5:
                this.player.play('mxb')
                break
            default:
                this.player.play('txy')
                break
        }
        if (hardDegree === 'easy') {
            this.jumpSpan = 285
            this.timeSpan = 0.024
        } else if (hardDegree === 'normal') {
            this.jumpSpan = 280
            this.timeSpan = 0.022
        } else if (hardDegree === 'hard') {
            this.jumpSpan = 270
            this.timeSpan = 0.021
        }
        this.schedule(function () {
            this.jumpY()
            this.jumpXM()
            this.jumpXP()
        }, this.timeSpan)
    },
    // 检查人物的坐标是否越过了方块：碰撞检测
    checkPosition: function (exist) {
        // 获取人物相对于路径原点的坐标
        this.playerPosition = {
            x: this.node.x - this.path.x,
            y: this.node.y - this.path.y
        }
        let curblockPosition = this.path.getComponent('Path').getPosition()
        // 人物未脱离砖块范围
        if ((Math.abs(curblockPosition.x - this.playerPosition.x) < 140 || Math.abs(curblockPosition.y - this.playerPosition.y) < 140) && exist === true) {
            return true
        } else if (this.AxisXM || this.AxisXP || this.AxisY) {
            // 正在跳跃
            return true
        } else {
            this.path.getComponent('Path').markBlock()
            // 那只有一死
            return false
        }
    },
    // 旋转人物跑动方向和跳跃方向
    rotatePlayer: function (direct) {
        if (direct != false) {
            this.jumpStart = false
            this.jumpend = false
        }
        // 人物有6个状态
        if (direct === 'vertical')
            this.node.setRotation(0)
        else if (direct === 'left')
            this.node.setRotation(-90)
        else if (direct === 'right')
            this.node.setRotation(90)
        else if (direct === 'jumpY' || direct === 'jumpXM' || direct === 'jumpXP') {
            this.jumpStart = true
            if (direct === 'jumpY') {
                this.AxisY = true
                this.AxisXM = false
                this.AxisXP = false
            } else if (direct === 'jumpXM') {
                this.AxisXM = true
                this.AxisY = false
                this.AxisXP = false
            } else if (direct === 'jumpXP') {
                this.AxisXP = true
                this.AxisY = false
                this.AxisXM = false
            }
        }
    },
    // 暂停人物动画
    pausePlayer: function () {
        this.tempAxisY = this.AxisY
        this.tempAxisXM = this.AxisXM
        this.tempAxisXP = this.AxisXP
        this.AxisY = false
        this.AxisXM = false
        this.AxisXP = false
    },
    // 重新播放人物动画
    restartPlayer: function () {
        this.AxisY = this.tempAxisY
        this.AxisXM = this.tempAxisXM
        this.AxisXP = this.tempAxisXP
    },
    // 向上跳
    jumpY: function () {
        if (this.AxisXM === true || this.AxisXP === true) return

        if (this.jumpStart && this.node.y < this.jumpSpan) {
            this.node.setPosition(this.node.x, this.node.y + 30)
        } else if (this.jumpStart && this.node.y >= this.jumpSpan) {
            this.jumpStart = false
        } else if (this.jumpend == false && this.node.y > 0) {
            this.node.setPosition(this.node.x, this.node.y - 30)
        } else if (this.jumpend == false && this.node.y <= 0) {
            this.AxisY = false
            return
        }
    },
    // 向右跳
    jumpXP: function () {
        if (this.AxisXM === true || this.AxisY === true) return

        if (this.jumpStart && this.node.x < this.jumpSpan) {
            this.node.setPosition(this.node.x + 30, this.node.y)
        } else if (this.jumpStart && this.node.x >= this.jumpSpan) {
            this.jumpStart = false
        } else if (this.jumpend == false && this.node.x > 0) {
            this.node.setPosition(this.node.x - 30, this.node.y)
        } else if (this.jumpend == false && this.node.x <= 0) {
            this.AxisXP = false
            return
        }
    },
    // 向左跳
    jumpXM: function () {
        if (this.AxisY === true || this.AxisXP === true) return

        if (this.jumpStart && this.node.x > -this.jumpSpan) {
            this.node.setPosition(this.node.x - 30, this.node.y)
        } else if (this.jumpStart && this.node.x <= -this.jumpSpan) {
            this.jumpStart = false
        } else if (this.jumpend == false && this.node.x < 0) {
            this.node.setPosition(this.node.x + 30, this.node.y)
        } else if (this.jumpend == false && this.node.x >= 0) {
            this.AxisXM = false
            return
        }
    }
});