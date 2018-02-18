const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const favicon = require('koa-favicon');
const requestMw = require('./middleware/request.js');

const PORT = process.env.port || 8080;
const app = new Koa();

app.use(favicon(__dirname + '/app/static/favicon.ico'));

if (process.env.NODE_ENV === 'production') {
  app.use(serve(path.join(__dirname, 'public')));
}
app.use(requestMw);

/* eslint-disable no-console */
const server = app
  .listen(PORT, function() {
    console.log('Koa server listening on port ' + server.address().port);
  })
  .on('error', function(err) {
    if (err.code === 'EACCES') {
      console.log(`Error: port ${PORT} is already in use. Choose another one.`);
    } else {
      console.log('Error: ', err);
    }
    process.exit(1);
  });
/* eslint-enable no-console */
module.exports = app;
