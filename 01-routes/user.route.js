'use strict';

const express = require('express');
const { userModel } = require('../02-models/index');
const { hashingPasword } = require('../03-middlewares/hashing');
const { basicAuthDecode } = require('../03-middlewares/basicAuthDecode');
const router = express.Router();


router.post(`/signup`, hashingPasword, signup);
router.post(`/signin`, basicAuthDecode, signin);
router.get(`/users`, getUsers);

async function signup(req, res, next) {
  try {
    let newUser = await userModel.create(req.body); //{"email":"any","username":"any","password":"any","role":"any"}
    res.status(200).send(newUser);
  } catch (e) {
    console.log(e);
    next('error inside signup function ');
  }
}

async function signin(req, res, next) {
  try {
    let obj = {
      user: {
        _id: req.signedUserWithToken.id,
        username: req.signedUserWithToken.username,
        role : req.signedUserWithToken.role,
      },
      token: req.signedUserWithToken.token,
      
    }
    res.status(200).send(obj);
  } catch (e) {
    next('error inside signin function');
  }

}

async function getUsers(req, res, next) {
  try {
    let allUsers = await userModel.findAll();
    res.status(200).send(allUsers);
  } catch (e) {
    next('error inside getUsers function ');
  }

}





module.exports = router;