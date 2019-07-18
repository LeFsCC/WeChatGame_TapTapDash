var playAlready = false


cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad(){
        this.win1 = this.node.getChildByName('win1')
        this.win2 = this.node.getChildByName('win2')
        this.fail1 = this.node.getChildByName('failed1')
        this.fail2 = this.node.getChildByName('failed2')
        this.initHint()
    },
    initHint:function(){
        this.win1.active = false
        this.win2.active = false
        this.fail1.active = false
        this.fail2.active = false
    },
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
         playAlready = false
    },
    playLoseHint:function() {
        if(playAlready === true){
            return
        }
        console.log('in lose')
         let N = Math.random() % 2
         this.initHint()
         if(N > 0.5){
            this.fail1.active = true
        } else {
            this.fail2.active = true
        }
        playAlready = false
    }
});
