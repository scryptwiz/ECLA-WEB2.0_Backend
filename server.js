const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors')
const routes = require('./Routes/appRoutes')

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/api', routes)

app.listen(PORT);