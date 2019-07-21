// 传递数据

var dataBase
cc.Class({
    extends: cc.Component,
    properties: {
    },
    // 接口，提供人物选择结果
    requirePlayerChoice:function (){
        dataBase = require("DataBase")
        return dataBase.playerChoice
    },
    // 接口，提供音量大小
    requireVolumn:function() {
        dataBase = require("DataBase")
        return  dataBase.volumnDegree
    },
    // 接口，提供数据库
    requireDataBase:function() {
        dataBase = require("DataBase")
        return dataBase
    },
    // 接口，提供难度模式
    requireHardDegree:function() {
        dataBase = require("DataBase")
        return dataBase.HardDegree
    }
});
