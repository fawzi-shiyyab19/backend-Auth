'use strict';

const express = require('express');
const { commentModel, userModel } = require('../02-models/index');
const { postModel } = require('../02-models/index');

const router = express.Router();

router.post('/comment/:postId/:userId', addComment);
router.get('/comment', getAllComments);


async function addComment(req, res, next) {
  try {
    const obj = { "comment": req.body.comment, "postId": req.params.postId, "userId": req.params.userId };  //{"comment":"any"}
    const newComment = await commentModel.create(obj);
    const Comments = await commentModel.findAll({ where: { postId: req.params.postId, userId: req.params.userId } });
    res.status(201).send(Comments);
  } catch (e) {
    next(`Error inside addComment function`)
  }
}

async function getAllComments(req, res, next) {
  try {
    const allComments = await commentModel.findAll({ include: [postModel, userModel] });
    res.status(200).send(allComments);
  } catch (e) {
    next(`Error inside getAllComments function`);
  }
}




module.exports = router;