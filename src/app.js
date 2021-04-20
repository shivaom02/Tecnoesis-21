const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())

require("dotenv").config();

const PORT = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

app.use(cookieParser('secret'))
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs");

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.error(err))

const routes = require('./routes')

app.use('/', routes)

app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
})
