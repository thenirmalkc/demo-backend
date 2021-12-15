'use strict';

// Requiring module alias
// Must be done first before any 'require' statement
require('module-alias/register');

require('dotenv').config();

const app = require('@root/router');
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Listening on port ->' + PORT);
});
