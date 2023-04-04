const express = require('express');
const app = express();
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const port = process.env.PORT || 6001
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const doctorRoute = require('./routes/doctorsRoute')
const cors = require('cors')
var corsOptions = {
    origin: 'https://642be044a7147905cfaef0ca--dainty-mooncake-91b478.netlify.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions));
  app.use(express.json());

app.listen(port, ()=> console.log(`Node Server Listening on Port ${port}`))

app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)
app.use('/api/doctor', doctorRoute)
