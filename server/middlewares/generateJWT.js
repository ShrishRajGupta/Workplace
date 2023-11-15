require('dotenv').config();
import { sign } from 'jsonwebtoken';

// Generates JWT
const checkF = function (user) {
    try {
        const token = sign({
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
export default{
    checkF
}