'use strict';

const express = require('express');
const { commentModel } = require('../03-models');
const router = express.Router();



router.post('/comment/:postID/:userID', addComment);



//===== handlers =====//


async function addComment(req, res, next) {
  try {
    const commentData = {
      content: req.body.content,
      postId: req.params.postID,
      userId: req.params.userID,
    }
    let createdComment = await commentModel.create(commentData);
    let commentsForId = await commentModel.findAll({ where: { postId: req.params.postID } });
    res.status(201).send(commentsForId);
  } catch (err) {
    next(`Error inside addComment function : ${err}`);
  }
}

//===== Export =====//


module.exports = router;

