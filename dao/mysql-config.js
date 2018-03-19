var Client = require("mysql-pro");
var client = new Client({
    mysql: {
        host: "127.0.0.1",
        port: 3306,
        database: "test",
        user: "root",
        password: "******"
    }
});

module.exports = client;
