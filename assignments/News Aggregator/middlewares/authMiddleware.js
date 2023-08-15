// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function authenticate(req, res, next) {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization, process.env.API_SECRET, function (err, decode) {
      console.log('decode',decode)
      if (err)  {
        req.user = undefined;
        next();
      }
      User.findOne({
          _id: decode.id
        }).then(user => {
          req.user = user;
          next();
        }).catch(err => {
          res.status(500)
          .send({
            message: err
          });
        });
    });
  } else {
    req.user = undefined;
    req.message = "Authorization header not found";
    next();
  }
}

module.exports = {
  authenticate,
};
