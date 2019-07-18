// 传递数据

var dataBase = require("DataBase")
cc.Class({
    extends: cc.Component,
<<<<<<< HEAD
    properties: {},
    requirePlayerChoice: function() {
        return dataBase.playerChoice
    },
    requireVolumn: function() {
        return dataBase.volumnDegree
    }
});
=======
    properties: {
    },
    requirePlayerChoice:function (){
        return dataBase.playerChoice
    },
    requireVolumn:function() {
        return  dataBase.volumnDegree
    }
});
>>>>>>> 56ba3e133f4fbcee70a6f22349c97b24d84428bf
