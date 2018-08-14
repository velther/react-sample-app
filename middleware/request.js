const path = require('path');
const fs = require('fs');

const isDev = process.env.NODE_ENV !== 'production';
const styles = [];
const scripts = [];

if (isDev) {
  scripts.push('<script src="//localhost:9000/vendors~main.bundle.js"></script>');
  scripts.push('<script src="//localhost:9000/main.bundle.js"></script>');
} else {
  try {
    const assetsFile = fs.readFileSync(path.join(__dirname, '../assets.json'));
    const assets = JSON.parse(assetsFile);
    Object.keys(assets).forEach((key) => {
      const chunk = assets[key];
      if (chunk.js) {
        scripts.push(`<script src="${chunk.js}"></script>`);
      }
      if (chunk.css) {
        styles.push(`<link rel="stylesheet" href="${chunk.css}">`);
      }
    });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }
}

const layout = `
<!DOCTYPE html>
<html>
    <head>
        <link rel="icon" href="favicon.ico">
        <link rel="icon" type="image/png" sizes="196x196" href="icon-196x196.png">
        <link rel="apple-touch-icon" type="image/png" href="icon-196x196.png">
        ${styles.join('')}
        <title>React Sample App</title>
    </head>
    <body>
        <div id="react-app" class="react-app"></div>
        ${scripts.join('')}
    </body>
</html>
`;

module.exports = async function renderer(ctx, next) {
  ctx.body = layout;
  ctx.type = 'text/html';
  next();
};
