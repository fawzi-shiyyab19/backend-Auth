'use strict';

const { start } = require('./server');
const { sequelize } = require('./02-models/index');
require('dotenv').config();



sequelize.sync()
  .then(() => { start(process.env.PORT); })
  .catch(() => { console.log(`error with strarting postgres Database check pgstart`)});