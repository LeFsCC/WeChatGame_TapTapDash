cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad() {
        this.pausePic = this.node.getChildByName('pausePic')
        this.startPic = this.node.getChildByName('restartPic')
    },
    changePic: function(is_start) {
        if (!is_start) {
            this.startPic.active = false
            this.pausePic.active = true
        } else {
            this.startPic.active = true
            this.pausePic.active = false
        }
    }
});