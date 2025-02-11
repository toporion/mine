const express = require('express')
const app = express()
const cors=require('cors')
const bodyParser=require('body-parser')
require('dotenv').config()
require('./model/db')
const AuthRoute=require('./routes/AuthRoute')
const EmployeeRoute=require('./routes/EmployeeRoute')
const port = process.env.PORT || 8080;


app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use('/auth',AuthRoute)
app.use('/api/employee',EmployeeRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})