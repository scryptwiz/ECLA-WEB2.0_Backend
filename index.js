const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
const cors = require('cors')
const routes = require('./Routes/appRoutes')
const mongoose  = require('mongoose')

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

const URI = process.env.MONGODB_URI
mongoose.connect(URI, (err)=> {
    {!err ? console.log("Connected Successfully") : console.log(err);}
})

app.use('/api', routes)
app.get('/', (req,res)=>{
    res.send("")
})
mongoose.Promise = global.Promise;

app.listen(PORT);