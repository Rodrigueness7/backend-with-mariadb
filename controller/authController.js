const db = require('../db');

const user = (req, res) => {

    try {
    
       const data = {
        username : req.body.username,
        password : req.body.password
       }

        db.selectWhere(data,'users', res)
       
    } catch (error) {
        
        res.send(error)
    }
}


module.exports = { user }