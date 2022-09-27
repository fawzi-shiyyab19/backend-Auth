'use strict';


function noRouteExist(req, res) {
  res.status(404).json(
    {
      code: 404,
      message: 'Page Not found'
    }
  )
}

module.exports = { noRouteExist };