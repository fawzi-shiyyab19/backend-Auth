'use strict';

require('dotenv').config();
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../02-models/index');

async function basicAuthDecode(req, res, next) {
  try {
    let userData = req.headers.authorization;
    let encodedData = userData.split(' ')[1]
    let decodedData = base64.decode(encodedData);
    let [username, password] = decodedData.split(':');
    let user = await userModel.findOne({ where: { username: username } });
    if (user) {
      let checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        let newToken = jwt.sign({ testJwtSign: user.username }, process.env.SECRET);
        /*
        1) Object key 'testJwtSign' call it whatever you want.
        2) The key 'testJwtSign' value MUST be unique because next time after check the token we will get the data from the database using it.
        */
        user.token = newToken;
        req.signedUserWithToken = user;
        next();
      } else {
        next('Wrong password try again');
      }
    } else {
      next('Username not found SignUp');
    }
  } catch (e) {
    next('error inside BasicAuthDecode function ');
  }
}



module.exports = { basicAuthDecode };