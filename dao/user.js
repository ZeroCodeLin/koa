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
    }
}
