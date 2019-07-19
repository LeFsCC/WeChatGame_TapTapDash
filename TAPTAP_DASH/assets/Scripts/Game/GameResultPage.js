cc.Class({
    extends: cc.Component,

    properties: {
        rankTxt: cc.RichText,
        starElement: {
            default : null,
            type : cc.Prefab
        }
    },
    onLoad () {
        this.confirmBn = this.node.getChildByName('confirm')
        this.confirmBn.active = true
        this.confirmBn.on('click',this.to_StartMenu,this)
        this.volumn = this.node.getComponent(cc.AudioSource)
        this.star = this.node.getChildByName('star')
        this.flag = 1
        this.AudioTimes = 0
    },
    // 记录成绩
    initStar:function() {
        var score = this.node.parent.getChildByName('score').getComponent('RecordScore').requireScore()
        if (score >= 0 && score < 10) {
            this.rankTxt.string = String("F")
            this.flag = 0
        } else if (score >= 10 && score < 20) {
            this.rankTxt.string = String("D")
            this.flag = 1
        } else if (score >= 20 && score < 30) {
            this.rankTxt.string = String("C")
            this.flag = 2
        } else if (score >= 30 && score < 40) {
            this.rankTxt.string = String("B")
            this.flag = 3
        } else if (score >= 40 && score < 50) {
            this.rankTxt.string = String("A")
            this.flag = 4
        } else if(score >= 50){
            this.rankTxt.string = String("A+")
            this.flag = 5
        }
        this.AudioTimes = this.flag
        // TODO 让星星渐次出现
        for(let i = 0; i < this.flag; i++){
             let pstar = cc.instantiate(this.starElement)
             this.star.addChild(pstar)
             pstar.setPosition(i * 100, 10)
             pstar.active = false
        }
        this.schedule(function(){
           if(this.flag >= 1){
               this.star1_emerge(this.star.children[0])
           }
        },0.1,1)
        this.schedule(function(){
            if(this.flag >= 2){
                this.star1_emerge(this.star.children[1])
            }
        },0.3,1)
        this.schedule(function(){
            if(this.flag >= 3){
                this.star1_emerge(this.star.children[2])
            }
        },0.5,1)
        this.schedule(function(){
            if(this.flag >= 4){
                this.star1_emerge(this.star.children[3])
            }
        },0.7,1)
        this.schedule(function(){
            if(this.flag >= 5){
                this.star1_emerge(this.star.children[4])
            }
        },0.9,1)
        this.schedule(function () {
            this.playAudio()
        },0.3,this.flag, 0.1)
    },
    playAudio: function () {
        if (this.AudioTimes > 0) {
            this.volumn.play()
            this.AudioTimes -= 1
        }
    },
    star1_emerge: function (star) {
        star.active = true
    },
    star2_emerge: function (star) {
        star.active = true
    },
    star3_emerge: function (star) {
        star.active = true
    },
    star4_emerge: function (star) {
        star.active = true
    },
    star5_emerge: function (star) {
        star.active = true
    },
    to_StartMenu: function () {
        cc.director.loadScene('start Scene')
    },
});
