const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route	GET api/users
// @desc	Register new user
// @access	Public
router.get('/', (req, res) => {
	const { name, email, password } = req.body;
    
    // Validation
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check existing email
    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({ msg: 'Email already in use' });
        })

    // Check existing username
    User.findOne({name})
        .then(user => {
            if(user) return res.status(400).json({ msg: 'Username already in use' });
        })

    // Register new user
    const newUser = new User({
        name,
        email,
        password
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                    
                });
        })
    })
});

module.exports = router;