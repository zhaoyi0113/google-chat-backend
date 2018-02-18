const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {router} = require('./router');
const socketServer = require('./socket_server');

const PORT = process.env.PORT || 3100;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const baseUrl = '/api/v0/';

app.use(baseUrl, router);
const http = require('http').Server(app);
const socket = socketServer(http);
http
  .listen(PORT, () => {
    console.log(`server is listen on ${PORT}`);
  })
	.on('error', err => console.log(err));

