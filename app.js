const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const routes = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.get('./js/scrolling.js',function(req,res){
//     res.sendFile(path.join(__dirname + './js/scrolling.js'));
// });


app.use('/', routes);


module.exports = app;