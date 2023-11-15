require('dotenv').config();
const jwt = require('jsonwebtoken');

// Generates JWT
const checkF = function (user) {
    try {
        const token = jwt.sign({
            user: { username: user.username, email: user.email, id: user._id }
        },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: "2h"
            }
        );
        return token;
    }
    catch {
        throw new Error('Validation Error');
    }
}
module.exports ={
    checkF
}