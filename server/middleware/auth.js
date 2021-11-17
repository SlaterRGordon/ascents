import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const { JWT_SECRET } = config;

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const isCustomAuth = token.length < 500;


        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, JWT_SECRET);

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

export default auth;