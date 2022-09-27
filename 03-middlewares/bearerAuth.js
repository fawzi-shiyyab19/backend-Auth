'use strict';

const jwt = require('jsonwebtoken');
const { userModel } = require('../02-models/index');
require('dotenv').config();

async function bearerAuth(req, res, next) {
  try {
    let bearerAuth = req.headers.authorization; //Bearer token
    let userToken = bearerAuth.split(' ')[1];
    let tokenObj = jwt.verify(userToken, process.env.SECRET);
    let user = await userModel.findOne({ where: { username: tokenObj.testJwtSign } });
    if (user) {
      req.user = user;
      next();
    }
  } catch (e) {
    next(`inside bearerAuth middleware : ${e}`);
  }
}







module.exports = { bearerAuth };