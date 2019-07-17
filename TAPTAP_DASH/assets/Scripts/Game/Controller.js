

// 控制系统，可以监视控制地图和人物的移动

cc.Class({
    extends: cc.Component,
    properties: {

    },
    editor: {
        executionOrder: -1
    },
    onLoad() {
        this.countTimer = 0
        this.ro = 0
        this.path = this.node.getChildByName('path')
        this.player = this.node.getChildByName('player')

        this.schedule(function() {
            this.easeRotation()
        }, 0.026)
    },
    pauseMap: function() {
        this.path.getComponent('Path').changeStatus(false)
    },
    pausePlayer: function() {

    },
    restartMap: function() {
        this.path.getComponent('Path').changeStatus(true)
    },
    restrartPlayer: function() {

    },
    launchGame: function() {
        this.path.getComponent('Path').launchGame()
    },

    // 旋转摄像机和人物
    RotateCamera: function() {
        let playerDirect = this.path.getComponent('Path').requireDirect()
        this.player.getComponent('Player').rotatePlayer(playerDirect)

        if (playerDirect !== false) {
            let angle = this.path.getComponent('Path').getnextRotation()
            this.ro = this.node.rotation
            if (this.ro === angle) return
            this.countTimer = 0
            if (angle > this.ro) this.ro = 4.5
            else if (angle < this.ro) this.ro = -4.5
        }
    },
    // 检查是否游戏结束
    checkLose:function (){
        
    },
    // 让转向动作缓慢进行
    easeRotation: function() {
        if (this.countTimer < 10) {
            this.countTimer += 1
            this.node.setRotation(this.node.rotation + this.ro)
        }
    }
});