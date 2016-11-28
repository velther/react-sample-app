// import path from 'path';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import marko from 'marko';

// import App from '../app/app.js';

// function findTemplate(template) {
//     return path.join(__dirname, '../views', `${template}.marko`);
// }

const layout = `
<!DOCTYPE html>
<html>
    <head>
        <link rel="icon" href="favicon.ico">
        <link rel="icon" type="image/png" sizes="196x196" href="icon-196x196.png">
        <link rel="apple-touch-icon" type="image/png" href="icon-196x196.png">
        <title>Baobab test app</title>
    </head>
    <body>
        <div class="react-app"></div>
        <script src="//localhost:9000/main.bundle.js"></script>
    </body>
</html>
`;

// TODO: Marko templates hot reloading
export default async function renderer(ctx, next) {
    // const reactString = ReactDOMServer.renderToString(<App />);
    ctx.body = layout;
    ctx.type = 'text/html';
    next();
}
