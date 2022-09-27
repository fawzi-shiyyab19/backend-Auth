'use strict';
const bcrypt = require('bcrypt');
const { userModel } = require('../02-models/index');



async function hashingPasword(req, res, next) {
  try {
    const checkUsername = await userModel.findOne({ where: { username: req.body.username } });
    const checkUemail = await userModel.findOne({ where: { email: req.body.email } });
    //note that if there is no data the returnd value is null.
    if (checkUsername) {
      next('username is taken');
    } else if (checkUemail) {
      next('email is taken');
    } else {
      let { password } = req.body;  // { "username":"any", "email":"any", "password":"any" }
      let hashPassword = await bcrypt.hash(password, 10);
      req.body.password = hashPassword;
      next();
    }
  } catch (e) {
    console.log(e);
    next('error inside hashingPasword middleware');
  }
}


module.exports = { hashingPasword };