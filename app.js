const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const routes = require('./routes/index');
const compileSass = require('express-compile-sass');
const root = process.cwd();

const app = express();
app.use(compileSass({
  root: root,
  sourceMap: true,
  sourceComments: true,
  watchFiles: true,
  logToConsole: false
}));

app.use(express.static(root));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', routes);


module.exports = app;