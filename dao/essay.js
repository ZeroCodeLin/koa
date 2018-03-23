const sql = require('./mysql-config');


module.exports = {
    lists: async function(ctx){
        const params = ctx.request.body;
        
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
                status: 'success',
                code: true
            };
        }, function(error){
            return {
                msg: '失败',
                status: 'error',
                code: false
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
                msg: "成功",
                code: true,
                status: 'success'
            };
        }, function(error){
            
            return {
                msg: '失败',
                status: 'error',
                code: false
            };
        });
        return res
    },
    detail: function(ctx){
        const id = ctx.params.id;
        const res = sql.query('select * from essay where id=?', id).then(function(result) {
            
            return {
                data: result[0],
                code: true,
                status: 'success'
            };
        }, function(error){
            return {
                msg: '失败',
                status: 'error',
                cod: false
            };
        });
        return res
    }
}
