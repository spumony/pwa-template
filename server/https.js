const express = require('express');
const compression = require('compression');
const path = require('path');
const spdy = require('spdy');
const fs = require('fs');

const port = process.env.PORT || 8080;
const app = express();

const serverRootPath = path.join(__dirname + '/../dist');

app.use(compression());
app.use(express.static(serverRootPath, {
  // maxAge: 31557600000
}));
app.get('*', (_, response) => {
  response.sendFile(path.resolve(serverRootPath, 'index.html'));
});

spdy.createServer({
  key: fs.readFileSync(path.resolve(__dirname + '/certificate/localhost.key')),
  cert: fs.readFileSync(path.resolve(__dirname + '/certificate/localhost.crt')),
}, app)
.listen(port, () => {
  console.log(`Server started on port ${port}. Visit https://localhost:${port}/`);
  console.log('Press CTRL + C to stop the server');
});
