const express  = require('express')
const app = express();
const bodyParser = require('body-parser');
const db = require('./Connection/Connection');
const cors =  require('cors');
require('dotenv').config();
const device = require("express-device");
const User = require('./Routes/UesrRoute/UserRouter');
const Links = require('./Routes/LinkRoute/LinkRouter');
const Analytics = require('./Routes/AnalyticRoute/AnalyticRouter');
const Clicks = require('./Routes/ClicksRoute/ClicksRouter');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(device.capture());

app.use(cors());

app.use('/',User);
app.use('/',Links);
app.use('/', Analytics);
app.use('/',Clicks);



app.listen(PORT,()=>{
    console.log(`server is listning at port ${PORT}`)
})
