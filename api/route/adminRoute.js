const express = require('express');
const router = express.Router();

const Account = require('../models/accountModel');

const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const keys = require('../config/keys');

const validateRegisterInput = require('../validation/register');

router.route('/').get(function(req, res) {
    
    // eslint-disable-next-line array-callback-return
    Account.find(function(err, accounts){
        if(err){
            console.log(err);
        }
        else {
            res.json(accounts);
        }
    });
});

router.route('/editAccount/:id').get(function (req, res) {
    let id = req.params.id;
    Account.findById(id, function (err, accounts){
        if(err){
          console.log(err);
        } else{
            res.json(accounts);
          }
          //res.json(accounts);
        });
  });

  router.route('/update/:id').post(function (req, res) {
    let id = req.params.id;
    Account.findById(id, function(err, accounts) {
    if (!accounts){
        console.log(err);
      res.status(404).send("data is not found");
    } else {
        //let date = Date.now;
        accounts.name = req.body.name;
        accounts.email = req.body.email;
        //accounts.date = date;
        accounts.save().then(accounts => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

router.route('/delete/:id').get(function (req, res) {
    let id = req.params.id;
    Account.findByIdAndRemove(id, function(err, accounts){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

/*
router.route('/create').post(function (req, res) {
  let account = new Account(req.body);
  account.save()
    .then(account => {
      res.status(200).json({'User account': ' was added successfully'});
    })
    .catch(err => {
    res.status(400).send("Unable to save User to database!");
    });
}); */


router.route('/create').post(function(req,res) {
  
  //console.log(req.body.password2);
  //var account = new Account(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);
  
  if(!isValid) {
      return res.status(400).json(errors);
  }

  Account.findOne({email: req.body.email }).then(user => {
      if(user) {
          return res.status(400).json({email: "Email is already registered"});
      }else {
          const newUser = new Account({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
          });
          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if(err) throw err;
                  newUser.password = hash;
                  newUser
                      .save()
                      .then(user => res.json(user))
                      .catch(err => console.log(err));
              });
          });
      }
  });
});

module.exports = router;