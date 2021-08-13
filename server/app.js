const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const api = require('./routes/api');

const PORT = process.env.PORT || 5000;

const app = express();

if (config.isDev) {
    const cors = require('cors');
    app.use(cors());
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'pages')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || 'Error');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));