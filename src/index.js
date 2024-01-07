require('dotenv').config()
require('./skills').init()

const express = require("express")
const app = express()

app.use('/', require('./routes'))

app.listen(process.env.APP_PORT, () => {
    console.log(`Listening on port ${process.env.APP_PORT}`)
})