const express = require("express");
const sequelize = require('./db');
const router = require('./routers/index');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(4000, () => {
            console.log(`server started on 4000`)
        });
    } catch (e) {
        console.log(e)
    }
}

start();