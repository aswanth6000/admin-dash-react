const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')



require('dotenv').config()
app.use(require('./Routes/UserRoutes/User Routes'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())




const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server Runnig on ${port}`);
})

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected!'));
