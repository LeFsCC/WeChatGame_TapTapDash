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
    },
    // 检查人物的坐标是否越过了方块
    checkPosition: function() {
        // 获取人物相对于路径原点的坐标
        this.playerPosition = {
            x: this.node.x - this.path.x,
            y: this.node.y - this.path.y
        }
        let curblockPosition = this.path.getComponent('Path').getPosition()
            // 人物
        if (Math.abs(curblockPositiona.x - this.playerPosition.x) > 120 ||
            Math.abs(curblockPositiona.y - this.playerPosition.y) > 120) {
            return false
        } else {
            return true
        }
    },
    initPlayer: function() {
        // TODO 播放人物动画
    },
    pausePlayer: function() {
        // TODO 暂停人物动画
    },
    turnLeft: function() {
        // TODO 人物左转
    },
    turnRight: function() {
        // TODO 人物右转
    },
    jump: function() {
        // TODO 人物跳跃
    }
});