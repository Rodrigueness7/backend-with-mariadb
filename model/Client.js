class Client {
    id;
    name;
    telephone;
    cep;

    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.telephone = data.telephone;
        this.cep = data.cep;
    }
}

module.exports = Client;