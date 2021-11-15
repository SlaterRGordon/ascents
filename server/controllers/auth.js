import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

import User from "../models/user.js";

const { JWT_SECRET } = config;

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) throw Error('Please enter all fields');

        const user = await User.findOne({ email });
        if (!user) throw Error('User does not exist');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw Error('Invalid credentials');

        const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: 3600 });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) throw Error('Please enter all fields');

        const emailExists = await User.findOne({ email });
        if (emailExists) throw Error('Email already in use');

        const usernameExists = await User.findOne({ email });
        if (usernameExists) throw Error('Username already in use');

        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt');

        const hash = await bcrypt.hash(password, salt);
        if (!hash) throw Error('Something went wrong hashing the password');
        console.log(hash);
        const result = await User.create({ username, email, password: hash });
        if (!result) throw Error('Something went wrong creating the user');
        console.log(result);

        const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: 3600 });

        res.status(200).json({
            token,
            user: {
                id: result._id,
                username: result.username,
                email: result.email
            }
        });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};