
cc.Class({
    extends: cc.Component,

    properties: {
        scoreTxt: cc.RichText
    },
    onLoad(){
       this.score = 0
    },
    // 更新成绩的文本内容
    updateScore: function(){
       let c = ++this.score
       this.scoreTxt.string = String(c)
    },
    // 接口，向外提供成绩
    requireScore:function() {
       return this.score
    }
});
