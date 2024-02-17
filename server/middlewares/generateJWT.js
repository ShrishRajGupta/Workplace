import dotenv from 'dotenv';
dotenv.config();
import jsonwebtoken from 'jsonwebtoken';

// Generates JWT
const checkF = function (user) {
    try {
        const token = jsonwebtoken.sign({
            user: { username: user.username, email: user.email, id: user._id }
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: "24h"
        });
        console.log(token);
        return token;
    } catch (error) {
        console.error(error); // Log the error for debugging
        throw new Error('Validation Error');
    }
}

export default checkF;
