const PORT = process.env.port || 8080;

import Koa from 'koa';
import favicon from 'koa-favicon';
import requestMw from './middleware/request.js';

const app = new Koa();

// app.disable('x-powered-by');
//
// app.set('views', __dirname + '/views');
// app.set('view engine', 'html');

app.use(favicon(__dirname + '/app/static/favicon.ico'));
// app.use('/', express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     res.render('index');
// });

app.use(requestMw);

const server = app
    .listen(PORT, function () {
        console.log('Koa server listening on port ' + server.address().port);
    })
    .on('error', function (err) {
        if (err.code === 'EACCES') {
            console.log(`Error: port ${PORT} is already in use. Choose another one.`);
        } else {
            console.log('Error: ', err);
        }
        process.exit(1);
    });

export default app;
