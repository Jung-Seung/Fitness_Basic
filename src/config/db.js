var mysql = require('mysql')
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'fitness_basic_db',
    port:3306,
    socketPath: '/tmp/mysql.sock'
})

module.exports=db;