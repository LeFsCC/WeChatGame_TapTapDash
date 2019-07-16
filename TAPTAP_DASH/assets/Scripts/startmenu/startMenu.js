// 开始场景，可转换到选择模式的场景
// 向前开始的按钮，

cc.Class({
    extends: cc.Component,

    // 把各个节点加载进来
    properties: {
        audioButton : {
            type : cc.AudioSource,
            default : null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.loadProperties()  
        this.initStartStage()
    },

    start () {
    },
    // 加载属性
    loadProperties: function() {
        // 插图
       this.people = this.node.getChildByName('People')
       this.title = this.node.getChildByName('title')
       this.background = this.node.getChildByName('background')
       // 按钮
       this.startBn = this.node.getChildByName('startBn')
       this.setBn = this.node.getChildByName('setBn')      
       this.backBn = this.node.getChildByName('backBn')
       this.volumnBn = this.node.getChildByName('volumn')
       this.purchaseBn = this.node.getChildByName('purchase')
       this.rankBn = this.node.getChildByName('rank')
       // 场景编码
       this.currentStage = 'stage_startMenu'            // stage_rank, stage_choicePage, stage_purchase, stage_pre, stage_set

       this.choicePage = this.node.getChildByName('MulChoiceBn').getComponent('chooseBn')
    },
    // 在入场动画开始前初始化场景
    initProperties: function() {
        cc.log('initProperties')
        this.people.active = false
        this.background.active = false
        this.title.active = false

        this.startBn.active = false
        this.setBn.active = false
        this.backBn.active = false
        this.volumnBn.active = false
        this.purchaseBn.active = false
        this.rankBn.active = false

        this.currentStage = 'stage_pre'
    },
    // 切换到选择关卡界面
    onClick_toChoicePage: function() {
       this.playButtonAudio()
       if(this.currentStage === 'stage_startMenu')
             this.initChoiceStage()
    },
    // 加载游戏场景
    onClick_toGameScene: function() {
        if(this.currentStage === 'stage_choicePage')
            cc.director.loadScene('Game')
    },
    // 退回到开始界面
    onClick_toStartStage: function() {
        this.playButtonAudio()
        if(this.currentStage === 'stage_choicePage'){
            
           this.choicePage.hideButton()
           this.initStartStage()
        }
    },
    initStartStage: function() {
        this.initProperties()
        
        this.startBn.on('click', this.onClick_toChoicePage, this)
        this.backBn.on('click',this.onClick_toStartStage,this)
        this.startBn.active = true 
        this.setBn.active = true
        this.background.active = true
        this.title.active = true
        this.people.active = true
        this.purchaseBn.active = true
        this.volumnBn.active = true
        this.rankBn.active = true
        this.currentStage = 'stage_startMenu'
    },
    initChoiceStage: function() {
       this.initProperties()
       this.currentStage = 'stage_choicePage'
       this.background.active = true
       this.backBn.active = true
       this.startBn.active = true
       // 初始化
       this.choicePage.initButtons(-500,360,10)
    },
    playButtonAudio: function() {
       this.audioButton.play()
    }
});
