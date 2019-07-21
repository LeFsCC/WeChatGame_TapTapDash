var playAlready = false


// 播放游戏胜利或结束时的人物搞笑图片
cc.Class({
    extends: cc.Component,

    properties: {

    },
    // 绑定节点
    onLoad(){
        this.win1 = this.node.getChildByName('win1')
        this.win2 = this.node.getChildByName('win2')
        this.fail1 = this.node.getChildByName('failed1')
        this.fail2 = this.node.getChildByName('failed2')
        this.initHint()
        playAlready = false
    },
    // 初始化图片
    initHint:function(){
        this.win1.active = false
        this.win2.active = false
        this.fail1.active = false
        this.fail2.active = false
    },
    // 胜利图片
    playWinHint:function() {
        if(playAlready === true){
            return
        }
         let N = Math.random() % 2
         this.initHint()
         if(N > 0.5){
             this.win1.active = true
         } else {
             this.win2.active = true
         }
         playAlready = true
    },
    // 失败图片
    playLoseHint:function() {
        if(playAlready === true){
            return
        }
         let N = Math.random() % 2
         this.initHint()
         if(N > 0.5){
            this.fail1.active = true
        } else {
            this.fail2.active = true
        }
        playAlready = true
    }
});
