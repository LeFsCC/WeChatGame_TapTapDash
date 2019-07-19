// 传递数据

var dataBase
cc.Class({
    extends: cc.Component,
    properties: {
    },
    requirePlayerChoice:function (){
        dataBase = require("DataBase")
        return dataBase.playerChoice
    },
    requireVolumn:function() {
        dataBase = require("DataBase")
        return  dataBase.volumnDegree
    },
    requireDataBase:function() {
        dataBase = require("DataBase")
        return dataBase
    },
    requireHardDegree:function() {
        dataBase = require("DataBase")
        return dataBase.HardDegree
    }
});
