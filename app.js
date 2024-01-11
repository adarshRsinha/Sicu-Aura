const dotenv = require("dotenv");
// const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();

dotenv.config({path: './config.env'});

require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

app.use(cors());

app.use(require('./router/auth'));

const port = process.env.PORT;

app.get('/login', (req,res) => {
    res.send(`Hello Login World form the server`);
});

app.get('/signup', (req,res) => {
    res.send(`Hello Registration World form the server`);
});

app.listen(port, () => {
    console.log(`server is running`);
});