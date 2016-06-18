const express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    app = express(),
    config = require('./app/config/config');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
require('./app/routes/route')(app);

mongoose.connect(config.db);
mongoose.connection.on('connected', () => { console.log('Mongoose default connection open to ' + config.db); });

app.listen(config.port, (err) => {
    if (err) { throw err; }

    console.log("App listening on port " + config.port);
});

module.exports = app;