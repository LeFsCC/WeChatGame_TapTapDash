
// 调节音量
cc.Class({
    extends: cc.Component,
    properties: {
        audioButton: {
            type: cc.AudioSource,
            default: null
        },
    },
    onLoad() {
        this.dataVolume = require('DataBase').volumeDegree
        this.node.getChildByName('bgmSlider').on('slide', this.bgmcallback, this)
        this.node.getChildByName('soundSlider').on('slide', this.soundcallback, this)
    },
    initSlides: function () {
        this.node.getChildByName('bgmSlider').on('slide', this.bgmcallback, this)
        this.node.getChildByName('soundSlider').on('slide', this.soundcallback, this)
        this.node.getChildByName('bgmSlider').active = true
        this.node.getChildByName('soundSlider').active = true
        this.node.getChildByName('bgm').active = true
        this.node.getChildByName('sound').active = true
    },
    bgmcallback: function () {
        // 背景音乐
        this.node.getComponent(cc.AudioSource).volume = this.node.getChildByName('bgmSlider').getComponent(cc.Slider).progress
        this.dataVolume.bgmVolume = this.node.getComponent(cc.AudioSource).volume
    },
    soundcallback: function () {
        // 按钮音乐
        this.audioButton.volume = this.node.getChildByName('soundSlider').getComponent(cc.Slider).progress
        this.dataVolume.bnVolume = this.audioButton.volume
    },
});