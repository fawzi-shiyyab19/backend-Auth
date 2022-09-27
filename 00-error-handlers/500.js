'use strict';

function errorHandler(err, req, res, next) {
  res.status(500).send(
    {
      code: 500,
      message: err
    }
  );
}




module.exports = { errorHandler };