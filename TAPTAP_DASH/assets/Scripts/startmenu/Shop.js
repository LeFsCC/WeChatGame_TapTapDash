cc.Class({
    extends: cc.Component,

    properties: {
        charaElement: {
            default: [],
            type: [cc.Prefab]
        },
        AudioBn: {
            type: cc.AudioSource,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.left = 0
        this.mid = 1
        this.right = 2
            // 计数器
        this.fixed = true
        this.midDirect = ''
    },
    getChara: function() {
        for (let i in this.node.children) {
            this.node.children[i].active = false
            this.node.children[i].targetOff(this)
        }
        this.unschedule(this.leftMovetoMedium)
        this.unschedule(this.mediumMovetoLeft)
        this.unschedule(this.mediumMovetoRight)
        this.unschedule(this.RightmovetoMedium)
        return this.mid
    },
    initButtons: function() {
        if (this.node.children.length === 0) {
            let initCount = 6
            for (let i = 0; i < initCount; i++) {
                let Chara = cc.instantiate(this.charaElement[i])
                this.node.addChild(Chara)
                Chara.active = false
            }
        }
        this.left = 0
        this.mid = 1
        this.right = 2
            // 计数器
        this.fixed = true
        this.midDirect = ''

        this.node.children[this.left].active = true
        this.node.children[this.left].setPosition(-300, 0)
        this.node.children[this.left].on('click', this.onClick_left, this)
        this.node.children[this.left].setScale(0.8)

        this.node.children[this.mid].active = true
        this.node.children[this.mid].setPosition(0, 0)
        this.node.children[this.mid].setScale(1.2)

        this.node.children[this.right].active = true
        this.node.children[this.right].on('click', this.onClick_right, this)
        this.node.children[this.right].setPosition(300, 0)
        this.node.children[this.right].setScale(0.8)
        let timeInterval = 0.04
        this.schedule(function() {
            this.leftMovetoMedium()
        }, timeInterval)
        this.schedule(function() {
            this.mediumMovetoLeft()
        }, timeInterval)
        this.schedule(function() {
            this.RightmovetoMedium()
        }, timeInterval)
        this.schedule(function() {
            this.mediumMovetoRight()
        }, timeInterval)
    },
    onClick_left: function() {
        this.playAudio()
        let cr = this.mid
        let cm = this.left
        let cl = (this.left + 5) % 6

        this.node.children[this.right].active = false
        this.node.children[this.right].off('click', this.onClick_right, this)
        this.node.children[this.left].off('click', this.onClick_left, this)
        this.mid = cm
        this.left = cl
        this.right = cr
        this.node.children[this.left].active = true
        this.node.children[this.left].setPosition(-300, 0)
        this.node.children[this.left].on('click', this.onClick_left, this)
        this.node.children[this.right].on('click', this.onClick_right, this)
        this.midDirect = 'right'
    },
    onClick_right: function() {
        this.playAudio()
        let cm = this.right
        let cr = (this.right + 1) % 6
        let cl = this.mid
        this.node.children[this.left].active = false
        this.node.children[this.left].off('click', this.onClick_right, this)
        this.node.children[this.right].off('click', this.onClick_left, this)

        this.mid = cm
        this.left = cl
        this.right = cr
        this.node.children[this.right].active = true
        this.node.children[this.right].setPosition(300, 0)
        this.node.children[this.left].on('click', this.onClick_left, this)
        this.node.children[this.right].on('click', this.onClick_right, this)
        this.midDirect = 'left'
    },
    leftMovetoMedium: function() {
        if (this.midDirect === '' || this.midDirect == 'left') return
        if (this.node.children[this.mid].x < 0)
            this.node.children[this.mid].setPosition(this.node.children[this.mid].x + 30, this.node.children[this.mid].y)
        if (this.node.children[this.mid].scale < 1.2)
            this.node.children[this.mid].setScale(this.node.children[this.mid].scale + 0.04)
    },
    mediumMovetoRight: function() {
        if (this.node.children[this.right].x < 300)
            this.node.children[this.right].setPosition(this.node.children[this.right].x + 30, this.node.children[this.right].y)
        if (this.node.children[this.right].scale > 0.8)
            this.node.children[this.right].setScale(this.node.children[this.right].scale - 0.04)
    },
    mediumMovetoLeft: function() {
        if (this.node.children[this.left].x > -300)
            this.node.children[this.left].setPosition(this.node.children[this.left].x - 30, this.node.children[this.left].y)
        if (this.node.children[this.left].scale > 0.8)
            this.node.children[this.left].setScale(this.node.children[this.left].scale - 0.04)
    },
    RightmovetoMedium: function() {
        if (this.midDirect === '' || this.midDirect == 'right') return
        if (this.node.children[this.mid].x > 0)
            this.node.children[this.mid].setPosition(this.node.children[this.mid].x - 30, this.node.children[this.mid].y)
        if (this.node.children[this.mid].scale < 1.2)
            this.node.children[this.mid].setScale(this.node.children[this.mid].scale + 0.04)
    },
    playAudio: function() {
        this.AudioBn.play()
    }
});