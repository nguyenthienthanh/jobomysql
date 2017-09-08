/**
 * Copyright 2017-present, Jobo App, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import bodyParser from 'body-parser';
import crypto from 'crypto';
import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import PrettyError from 'pretty-error';
import net from 'net';
// ===== CONFIG PRETTY ERROR ===================================================
import config from 'config';
const pretty = new PrettyError();
const app = express();

app.set('port', process.env.PORT || process.env.APIPORT || 5000 || config.get('apiPort'));

app.set('sslPort', process.env.SSLPORT || 5215 || config.get('apiSslPort'));
/* ----------  Parsers  ---------- */

const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
  console.log(req.originalUrl);
  next();
}, require('routes/index'));

/* ----------  Errors  ---------- */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res) {
  // set locals, only providing error in development
  if (err.code >= 500) console.error(pretty.render(error));
  else console.error(pretty.render(err.message));
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app).listen(app.get('port')).on('error', onError).on('listening', () => onListening(server));

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    process.exit(1);
    break;
  default:
    throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(_server) {
  var addr = _server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  console.log('Listening on ' + bind);
}
// app.listen(app.get('port'), () => {
//   console.log('Node app is running on port', app.get('port')); // eslint-disable-line
// });

export default app;