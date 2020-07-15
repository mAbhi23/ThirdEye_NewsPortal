require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const feedController = require('./controllers/feedController');
const homepage = require('./models/feeds.model');

var app = express();
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/views/'));
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));


app.use('/', homepage);

app.use('/feeds', feedController);

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});
