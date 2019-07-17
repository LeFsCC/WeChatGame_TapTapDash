cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad () {
        this.initSource()
    },

    start () {

    },
    initSource: function() {
        cc.log('init game')
        this.background = this.node.getChildByName('background')
        this.gameCamera = this.node.getChildByName('gameCamera')
        this.gameCamera.active = true
    }
    // update (dt) {},
});
