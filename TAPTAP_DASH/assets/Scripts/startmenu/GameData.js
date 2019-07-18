// 传递数据

var dataBase = require("DataBase")
cc.Class({
    extends: cc.Component,
    properties: {
    },
    requirePlayerChoice:function (){
        return dataBase.playerChoice
    },
    requireVolumn:function() {
        return  dataBase.volumnDegree
    }
});
