'use strict';
const { postModel, commentModel } = require('../03-models');

 function acl(capability) {
  return async function aclMiddleware(req, res, next) {
    try {

      if(req.method == "DELETE" || req.method == "PUT"){
        let id = req.params.id ;
        let post = await postModel.findOne({ where: { id } });
        if (post === null) {
            res.status(204).send(`no post with match id`);
          }else {
            console.log(req.user.id, post.userId)
            let includeOrNot = req.user.actions.includes(capability);
              if (includeOrNot || req.user.id === post.userId) {
                return  next();
              } else {
                res.status(403).send(`Access Denied`);
              }

          }

      }else{
        let includeOrNot = req.user.actions.includes(capability);
          if (includeOrNot) {
            return next();
          } else {
            res.status(403).send(`Access Denied`);
          }
         
      }

    } catch (err) {
      next(`Error inside acl middleware :${err}`);
    }

  };
}



module.exports = { acl };