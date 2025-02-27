const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

const routes = require('./routes')

app.use('/', routes)

app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
})
