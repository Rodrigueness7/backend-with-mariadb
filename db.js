require('dotenv').config()
const mariadb = require('mariadb');
const jwt = require('jsonwebtoken');


const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: process.env.database,
    connectionLimit: 5

})


const select = (table, res) => {

    pool.getConnection().then(
        conn => {
            conn.query(`SELECT * FROM ${table}`).then(
                (rows) => {
                    res.json(rows)
                }
            )
        }
    )
}

const insert = (table, data) => {

    let item = '?'.repeat(Object.keys(data).length);

    pool.getConnection().then(
        conn => {
            conn.query(`INSERT INTO ${table} VALUE (${Object.values(item)})`, Object.values(data))


        }
    );
}


const update = (table, condition, valueCondition, data) => {

    let values = Object.keys(data).join(' = ?, ').concat(' = ? ')

    pool.getConnection().then(

        conn => {
            conn.query(`UPDATE ${table} SET ${values} WHERE ${condition} = ${valueCondition}`, Object.values(data))
        }
    )
}

const remove = (table, condition, valueCondition) => {

    pool.getConnection().then(
        conn => {
            conn.query(`DELETE FROM ${table} WHERE ${condition} = ${valueCondition}`)
        }
    )
}

const selectWhere = (data, table, res) => {

    const user = Object.values(data)
    const keys = Object.keys(data).join(' =? AND ').concat(' =? ').toString();

    pool.getConnection().then(
        conn => {
            conn.query(`SELECT * FROM ${table} WHERE ${keys}`, user).then(
                (rows) => {
                    if (rows == '') {
                        res.status(401).send('Failed login')
                        console.log(rows)
                    } else {
                        const payload = user.join('')
                        const auther = jwt.sign(payload, process.env.secret)
                        res.header('authoriztion-token', auther)
                        
                        res.send('Logged')
                       
                       
                    }
                }
            )
        }
    )


}


module.exports = { select, insert, update, remove, selectWhere }