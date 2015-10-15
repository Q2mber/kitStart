var mysql = require('mysql')

function dbQuery(query, localCallback) {
    var connection = mysql.createConnection({
        host: '92.222.46.164',
        user: 'testRoman',
        password: 'JMJRyVbXEfJrffKD',
        database: 'testRoman',
        connectTimeout: 15000
    })
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log(err)
        };
        localCallback(rows)
        connection.destroy();
    })
}

function get(response) {
    var query = "SELECT * from test"
    dbQuery(query, function (rows) {
        response.write(JSON.stringify(rows))
        response.end()
    })
}

function put(response, page, category, user, password) {
    var query = "INSERT INTO `test`(`page`, `category`, `user`, `password`) VALUES ('" + page + "','" + category + "','" + user + "','" + password + "')"
    dbQuery(query, function (rows) {
        response.write(JSON.stringify(rows))
        response.end()
    })
}

function rename(response, old, nw) {
    var query = "UPDATE `test` set `page`='" + nw + "'WHERE `page`='"+old+"'"
    dbQuery(query, function (rows) {
        response.write(JSON.stringify(rows))
        response.end()
    })
}

function del(response, page) {
    var query = "DELETE from `test` WHERE `page`='"+page+"'"
    dbQuery(query, function (rows) {
        response.write(JSON.stringify(rows))
        response.end()
    })
}

exports.get = get
exports.put = put
exports.rename = rename
exports.del = del

