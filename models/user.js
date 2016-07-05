'use strict';

const JWT_SECRET = process.env.JWT_SECRET;

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.statics.authMiddleware = function(req, res, next) {
  // look at the cookie, and get the token
  // verify the token

  // if token is bad or absent, respond with error (not authorized)
  // if token is good, call next

  let token = req.cookies.authtoken;

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if(err) return res.status(401).send(err);

    User.findById(payload._id, (err, user) => {
      if(err || !user) return res.status(401).send(err || {error: 'User not found.'});

      req.user = user;

      next();
    }).select('-password');
  });
};

userSchema.methods.generateToken = function() {
  let payload = {
    _id: this._id,
    username: this.username
  };

  let token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1 day'});
  return token;
};

userSchema.statics.register = function(userObj, cb) {

  // Check that the username is not taken
  // Create a new user document

  this.findOne({username: userObj.username}, (err, user) => {
    if(err || user) return cb(err || {error: 'Username already taken.'});

    bcrypt.hash(userObj.password, 12, (err, hash) => {
      if(err) return cb(err);

      userObj.password = hash;

      this.create(userObj, err => {
        cb(err);
      });
    });
  });
};

userSchema.statics.authenticate = function(userObj, cb) {

  // try to find user document by username
  // check if username and password match
  // set login state

  this.findOne({username: userObj.username})
    .exec((err, user) => {
      if(err) return cb(err);

      if(!user) {
        return cb({error: 'Invalid username or password.'});
      }
      //           ( password attempt,   db hash )
      bcrypt.compare(userObj.password, user.password, (err, isGood) => {
        if(err || !isGood) return cb(err || {error: 'Invalid username or password.'});

        user.password = null;

        cb(null, user);
      });
    });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
