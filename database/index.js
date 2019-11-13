const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Maxstien',
    password: 'maxstien01',
    database: 'persipura',
    port: 3306,
    // multipleStatements: true
    // timezone: 'UTC'
})

module.exports = {
    sqlDB: db
}