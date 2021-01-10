const bcrypt = require('bcryptjs');
const auth = require('basic-auth');
const {User} = require('../models');


async function authenticateUser(req, res, next) {
    const credentials = auth(req);
    let message;

    if (credentials) {
        const user = await User.findOne({ where: {emailAddress: credentials.name} });
        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);
            if (authenticated) {
                req.currentUser = user;
            } else {
                message = `Authentication failure for ${user.emailAddress}`;
            }
        } else {
            message = `User not found for username: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        res.status(401).json({message: 'Access Denied'});
    } else {
        next();
    }
}

module.exports = authenticateUser;