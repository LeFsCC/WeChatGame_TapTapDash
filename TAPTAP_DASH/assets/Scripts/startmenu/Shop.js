// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        charaElement: {
            default: [],
            type: [cc.Prefab]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.left = 0
        this.mid = 1
        this.right = 2
    },

    initButtons: function() {
        let initCount = 6
        for (let i = 0; i < initCount; i++) {
            let Chara = cc.instantiate(this.charaElement[i])
            this.node.addChild(Chara)
            if (i === 0) {
                Chara.setPosition(-300, 0)
                Chara.setScale(1)
                Chara.on('click', this.onClick_left, this)
                Chara.active = true
                this.left = 0
            } else if (i === 1) {
                Chara.setPosition(0, 0)
                Chara.setScale(1.5)
                Chara.active = true
                this.mid = 1
            } else if (i === 2) {
                Chara.setPosition(300, 0)
                Chara.setScale(1)
                Chara.on('click', this.onClick_right, this)
                Chara.active = true
                this.right = 2
            } else {
                Chara.active = false
            }
        }
    },
    onClick_left: function() {
        console.log('clicked')
        let nm = this.left
        let nr = this.mid
        let nl = (this.left + 5) % 6
        for (let i = 0; i < 6; i++) {
            let Chara = this.node.children[i]
            if (i === nm) {
                Chara.setPosition(0, 0)
                Chara.setScale(1.5)
                Chara.active = true
                this.mid = i
            } else if (i === nr) {
                Chara.setPosition(300, 0)
                Chara.setScale(1)
                Chara.on('click', this.onClick_right, this)
                Chara.active = true
                this.right = nr
            } else if (i === nl) {
                Chara.setPosition(-300, 0)
                Chara.setScale(1)
                Chara.on('click', this.onClick_left, this)
                Chara.active = true
                this.left = nl
            } else {
                Chara.off('click', this.onClick_left, this);
                Chara.off('click', this.onClick_right, this);
                Chara.active = false
            }
        }
    },
    onClick_right: function() {
        console.log('clicked')
        let nm = this.right
        let nr = (this.right + 1) % 6
        let nl = this.mid
        console.log(nl, nm, nr)
        for (let i = 0; i < 6; i++) {
            let Chara = this.node.children[i]
            if (i === nm) {
                Chara.setPosition(0, 0)
                Chara.setScale(1.5)
                Chara.active = true
                this.mid = i
            } else if (i === nr) {
                Chara.setPosition(300, 0)
                Chara.setScale(1)
                Chara.on('click', this.onClick_right, this)
                Chara.active = true
                this.right = nr
            } else if (i === nl) {
                Chara.setPosition(-300, 0)
                Chara.setScale(1)
                Chara.on('click', this.onClick_left, this)
                Chara.active = true
                this.left = nl
            } else {
                Chara.off('click', this.onClick_left, this);
                Chara.off('click', this.onClick_right, this);
                Chara.active = false
            }
        }
    },
    getChara: function() {
        return this.mid
    },
    // update (dt) {},
    start() {},
});