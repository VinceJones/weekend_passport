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
    if (req.isAuthenticated()) {
        Users.find({}, "username", function(err, Users){
            res.json(Users);
        });

    } else {
        res.json("You are not Authenticated");
    }
});

module.exports = router;
