const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const nocache = require('nocache')
app.use(cors())



app.use(nocache())
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(require('./Routes/UserRoutes/User Routes'))

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server Runnig on ${port}`);
})

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected!'));
