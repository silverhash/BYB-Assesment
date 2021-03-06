﻿require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/mail', require('./controller/mail.controller'));
app.use('/test', () => { console.log('testing the express server') });


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8000;
app.listen(port, () => console.log('Server listening on port ' + port));