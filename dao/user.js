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
        const password = md5(ctx.request.body.password);
        const params = ctx.request.body;
        const arr = [params.nick_name, params.email, password, new Date()];
        const res = sql.query(`insert into users ( nick_name, email, password, gmt_created) values (?,?,?,?)`, arr).then(function(result) {
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
        console.log(ctx.request.body,'11')
        const id = ctx.request.body.id;
        const res = sql.query('select * from users where id=1', 11).then(function(result) {
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
    userDetail: function(ctx){
        console.log(ctx.request.body,'11')
        const id = ctx.request.body.id;
        const res = sql.query('select * from users where id=1', 11).then(function(result) {
            console.log('result',result)
            return {
                data: result[0],
                code: true,
                status: 'success'
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
