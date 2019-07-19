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
        this.jumpSpan = 275
        this.timeSpan = 0.028
    },
    choosePlayer:function(playerIndex,hardDegree){
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
            this.jumpSpan = 290
            this.timeSpan = 0.029
        } else if (hardDegree === 'normal') {
            this.jumpSpan = 280
            this.timeSpan = 0.028
        } else if (hardDegree === 'hard') {
            this.jumpSpan = 270
            this.timeSpan = 0.027
        }
        this.schedule(function() {
            this.jumpY()
            this.jumpXM()
            this.jumpXP()
        }, this.timeSpan)
    },
    // 检查人物的坐标是否越过了方块
    checkPosition: function(exist) {
        // 获取人物相对于路径原点的坐标
        this.playerPosition = {
            x: this.node.x - this.path.x,
            y: this.node.y - this.path.y
        }
        let curblockPosition = this.path.getComponent('Path').getPosition()
            // 人物未脱离砖块范围
        if ((Math.abs(curblockPosition.x - this.playerPosition.x) < 130 ||
                Math.abs(curblockPosition.y - this.playerPosition.y) < 130) && exist === true) {
            return true
        } else if (exist === false && (this.AxisXM || this.AxisXP || this.AxisY)) {
            // 虽然不存在但是正在跳跃
            return true
        } else {
            // 那只有一死
            return false
        }
    },
    rotatePlayer: function(direct) {
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
    pausePlayer: function() {
        this.player.pause()
    },
    jumpY: function() {
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
    jumpXP: function() {
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
    jumpXM: function() {
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