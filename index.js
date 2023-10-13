const express = require('express');
const app = express();
const PORT = 3000;
const route = require('./router/route');


app.use('/', express.json(), express.urlencoded( {extended: true}), route);

app.listen(PORT, (error) => {
    if (error) {
        console.log('There was an error in server')
    } else {
        console.log(`Server running in PORT ${PORT}`)
    }
})