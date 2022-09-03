const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
const cors = require('cors')
const routes = require('./Routes/appRoutes')

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/api', routes)
app.get('/', (req,res)=>{
    res.send("")
})

app.listen(PORT);