const express = require('express');
const expressConfig = require('./config/expressConfig.js')
const initDb = require('./config/database.js');
const router = require('./config/routes.js');


start();

async function start(){
    
    const app = express();

    expressConfig(app);

    await initDb();

    app.use(router);

    app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
}