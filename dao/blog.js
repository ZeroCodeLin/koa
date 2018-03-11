const sql = require('./mysql-config');


module.exports = {
    lists: async function(ctx){
        const params = ctx.request.body;
        console.log('1',params)
        let page = (params.page - 1)|| 0
        const start = page * params.pageSize;
        const end = parseInt(params.pageSize);
        let total = 0;
        
        await sql.query('select count(*) from essay').then(function(result) {
            total = result[0]['count(*)'];
         });

        const res = sql.query('select * from essay Order By gmt_created Desc limit ?,?;',[start, end]).then(function(result) {
            return {
                data: result,
                total: total,
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
    write: function(ctx){
        const body = ctx.request.body;
        const arr = [body.title, body.description, body.content, new Date()]
        const res = sql.query('insert into essay (title ,description ,content ,gmt_created ) values (?,?,?,?)',arr).then(function(result) {
            console.log('result',result)
            return {
                message: "成功",
                code: 1
            };
        }, function(error){
            console.log(error,'error')
            return {
                message: '失败',
                status: false
            };
        });
        return res
    },
    detail: function(ctx){
        const id = ctx.params.id;
        const res = sql.query('select * from essay where id=?', id).then(function(result) {
            console.log('result',result)
            return {
                data: result[0],
                code: 1
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
