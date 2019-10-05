const express = require('express');
const router = express.Router();

const Account = require('../models/accountModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

//const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

router.route('/login').post(function(req, res) {
    
    let account = new Account(req.body);
    const { errors, isValid } = validateLoginInput(account);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
        const password = req.body.password;

        Account.findOne({ email }).then(user => {
            if(!user) {
                return res.status(404).json({ emailnotfound: 'Email not found '});
            }

        bcrypt.compare(password, user.password).then(isMatch => {
                if(isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name
                    };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    (err, token) => {
                        res.json({
                            succes: true,
                            token: "Bearer" + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ passwordincorrect: 'Password incorrect'});
            }
        });
    });
});

module.exports = router;