var express = require('express');
var router = express.Router();
var path = require('path');
var Users = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
          res.sendFile(path.resolve(__dirname, '../views/users.html'));
  } else {
      res.json("You are not Authenticated");
  }
});

router.get('/searchUsers', function(req, res, next){
    if (req.user.username == "batman") {
        if (req.isAuthenticated()) {
            Users.find({}, "username name.first name.last email", function (err, Users) {
                res.json(Users);
            });

        } else {
            res.json("You are not Authenticated");
        }
    } else {
        if (req.isAuthenticated()) {
            Users.find({username: new RegExp(req.user.username, "i")}, "username name.first name.last email", function (err, Users) {
                res.json(Users);
            });

        } else {
            res.json("You are not Authenticated");
        }
    }
});

/* DELETE /assignments/:id */
router.delete('/:id', function(req, res, next) {
    if (req.isAuthenticated()) {
        Users.findByIdAndRemove(req.params.id, req.body, function (err, Users) {
            if (err) return next(err);
            res.json({username: Users.username, firstname: Users.name.first, lastname: Users.name.last,email: Users.email}+"\n was deleted by " + req.user.username);
        });
    } else {
        res.json("You are not Authenticated");
    }
});

module.exports = router;
