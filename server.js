'use strict';

const express = require('express');
const cors = require('cors');
const { noRouteExist } = require('./00-error-handlers/404');
const { errorHandler } = require('./00-error-handlers/500');
const postRouters = require('./01-routes/post.route');
const commentRouters = require('./01-routes/comment.route');
const userRouters = require('./01-routes/user.route');

const app = express();


app.use(cors());
app.use(express.json());


app.use(postRouters);
app.use(commentRouters);
app.use(userRouters);


app.get('/', (req, res) => {
  res.send(`main route`);
});




app.use('*', noRouteExist);
app.use(errorHandler);

function start(port) {
  app.listen(port, () => { console.log(`Up and running at ${port}`) });
}

module.exports = { start };