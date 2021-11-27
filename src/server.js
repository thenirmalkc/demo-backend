'use strict';

require('dotenv').config();

const app = require('./router');
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Listening on port ->' + PORT);
});
