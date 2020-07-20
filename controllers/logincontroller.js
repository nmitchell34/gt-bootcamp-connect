// Requirements

const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");

//  Routes

// Authentication Route
router.post("/", (req, res) => {
  console.log(req.body);

  db.User.findOne({
    where: {
      email: req.body.email,
      // password: req.body.password
    },
  })
    .then((foundUser) => {
      console.log(foundUser);
      bcrypt
        .compare(req.body.password, foundUser.password)
        .then(function (result) {
          console.log(result);
          if (result) {
            res.json({
              error: false,
              data: {
                email: foundUser.email,
              },
              message: "User Authenticated.",
            });
          }
        });
    })
    .catch(function (err) {
      console.log(err);
      res.status(401).json(err);
    });
});


module.exports = router;
