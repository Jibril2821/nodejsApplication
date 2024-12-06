const express = require('express');
const cors = require('cors')
const app = express();
var { Client } = require('pg');
const port = process.env.PORT || 8080;
const jsonData = require('./setting.json');

app.use(cors());

var pg = new Client({
    user: jsonData.user,
    host: jsonData.host,
    database: jsonData.database,
    password: jsonData.password,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

pg.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

app.get('/', async (req, res) => {
    try {
        const result = await pg.query('SELECT * FROM test');
        res.json({
            result: result.rows
        })
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })