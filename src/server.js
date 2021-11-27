'use strict';

require('dotenv').config();

const app = require('./router');
const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT, HOST, () => {
  console.log('Listening on -> ' + HOST + ':' + PORT);
});

console.log('test');
