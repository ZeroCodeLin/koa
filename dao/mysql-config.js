var Client = require("mysql-pro");
var client = new Client({
    mysql: {
        host: "120.27.214.56",
        port: 3306,
        database: "blog_test",
        user: "root",
        password: "ly1207"
    }
});

module.exports = client;
