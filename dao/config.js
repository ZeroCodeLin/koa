var Client = require("mysql-pro");
var client = new Client({
    mysql: {
        host: "127.0.0.1",
        port: 3306,
        database: "demo",
        user: "root",
        password: "ly1207"
    }
});

module.exports = client;