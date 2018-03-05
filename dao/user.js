const sql = require('./mysql-config');
var md5 = require('md5');

module.exports = {
    login: function(ctx){
        const password = md5(ctx.request.body.password)
        const arr = [ctx.request.body.name, password];
        const res = sql.query('select * from users where name=? and password=?;', arr).then(function(result) {
            return {
                isTrue: true
            };
          }, function(error){
            return {
                isTrue: false
            };
          });
        return res
    },
    register: function(ctx){
        const password = md5(ctx.request.body.password)
        const arr = [ctx.request.body.name, password];
        const res = sql.query(`insert into users ( name, password) values (?,?)`, arr).then(function(result) {
            console.log('result',result)
            return {
                message:"注册成功",
                status: true
            };
          }, function(error){
            
            return {
                message:"注册失败",
                status: false
            };;
          });
        return res;
    },
    list: function(ctx){
        console.log(ctx.request.body,'1')
        const id = ctx.request.body.id;
        const res = sql.query('select * from users where id=?', 1).then(function(result) {
            console.log('result',result)
            return {
                data: result,
                code: 1
            };
          }, function(error){
            return {
                message: '失败',
                status: false
            };
          });
        return res
    },
    updateInfo: function(ctx){
        const params = ctx.request.body;
        const arr = [params.nickName, params.email, params.git, 1];
        const res = sql.query('update users set nick_name=?, email=?, github=? where id=?', arr).then(function(result) {
            console.log('result',result)
            return {
                message:"注册成功",
                status: true
            };
          }, function(error){
            return {
                message: '失败',
                status: false
            };
          });
        return res
    }
}
