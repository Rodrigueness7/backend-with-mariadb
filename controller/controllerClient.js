const db = require('../db');
const Client = require('../model/Client');

const findAll = (req, res) => {

    try {

        db.select('client', res);

    } catch (error) {

        res.send(error)

    }
}

const addClient = (req, res) => {

    try {
        let client = new Client(req.body)
        db.insert('client', client)
        res.send('Adicionar')

    } catch (error) {

        res.send(error)

    }
}

const updateClient = (req, res) => {

    let valueId = req.params.id;

    try {

        db.update('client', 'id', valueId, req.body)
        res.send('Atualizado')

    } catch (error) {

        res.send(error)

    }
}

const removeClient = (req, res) => {

    let valueId = req.params.id;

    try {

        db.remove('client', 'id', valueId);
        res.send('Delete')

    } catch (error) {

        res.send(error)

    }


}

module.exports = { findAll, addClient, updateClient, removeClient }