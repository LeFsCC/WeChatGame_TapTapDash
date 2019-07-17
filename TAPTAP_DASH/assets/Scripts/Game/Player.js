

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
        this.player  = this.getComponent(cc.Animation)
        this.player.play('play')

        // 正在跳高
        this.jumpStart = false
        // 跳跃结束
        this.jumpend = false
        // Y向跳跃
        this.AxisY = false
        this.AxisX = false

        this.schedule(function(){
           this.jumpY()
        },0.03)
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
    rotatePlayer:function(direct){
       if(direct != false) {
           this.jumpStart = false
           this.jumpend = false
       }
       if(direct === 'vertical')
        this.node.setRotation(0)
       else if(direct === 'left')
       this.node.setRotation(-90)
       else if(direct === 'right')
       this.node.setRotation(90)
       else if(!direct){
         this.jumpStart = true
       }
    },
    pausePlayer: function() {
       this.player.pause()
    },
    jumpY:function(){
        if(this.AxisX == true) return

       if(this.jumpStart && this.node.y < 200){
           this.node.setPosition(this.node.x,this.node.y + 30)
       } else if (this.jumpStart && this.node.y >= 200) {
           this.jumpStart = false
       } else if (this.jumpend == false && this.node.y > 0) {
          this.node.setPosition(this.node.x,this.node.y - 30)
       } else if (this.jumpend == false && this.node.y <= 0) {
           return
       }
    },
    jumpX:function(){
        if(this.AxisY == true) return

        if(this.jumpStart && this.node.x < 200){
            this.node.setPosition(this.node.x + 30,this.node.y)
        } else if (this.jumpStart && this.node.x >= 200) {
            this.jumpStart = false
        } else if (this.jumpend == false && this.node.x > 0) {
           this.node.setPosition(this.node.x - 30,this.node.y)
        } else if (this.jumpend == false && this.node.x <= 0) {
            return
        }
    }
});
