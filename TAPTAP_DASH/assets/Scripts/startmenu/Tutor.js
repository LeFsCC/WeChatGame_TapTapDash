cc.Class({
    extends: cc.Component,

    properties: {
       
    },
    initTutor:function(){
        this.node.getChildByName('TutorText').active = true
        this.node.getChildByName('TutorTitle').active = true
        this.node.getChildByName('TutorText').getComponent(cc.RichText).string = this.initTextString()
        this.node.getChildByName('TutorTitle').getComponent(cc.RichText).string = this.initTitleString()
    },
    initTextString:function(){
        let str=''
        str+='<size=50>点击主页面的商店按钮选择人物.<br/><br/>点击主页面的音量调节按钮控制背景音乐和音效音量</size>'
        str+='<br/><br/>'
        str+='<size=50>点击主页面的右向按钮进入难度模式选择页面<br/><br/>点击相应的难度开始游戏</size></color>'
        str+='<br/><br/>'
        str+='<color=#000000><size=50>点击屏幕任意位置实现跳跃和自动转弯。<br/><br/>点击游戏界面右上角的暂停按钮实现游戏暂停</size>'
        return str
    },
    initTitleString:function(){
        let str=''
        str+='<size=60><b>游戏说明</b></size>'
        str+='<br/><br/>'
        return str
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
