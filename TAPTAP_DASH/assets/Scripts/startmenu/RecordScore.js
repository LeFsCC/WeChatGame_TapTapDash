
cc.Class({
    extends: cc.Component,

    properties: {
        scoreTxt: cc.RichText
    },
    onLoad(){
       this.score = 0
    },
    updateScore: function(){
       let c = ++this.score
       this.scoreTxt.string = String(c)
    },
    requireScore:function() {
       return this.score
    }
});