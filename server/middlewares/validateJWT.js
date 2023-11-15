import { verify } from 'jsonwebtoken';
require('dotenv').config()

const secretKey = process.env.ACCESS_TOKEN;

const authenticateToken = (req, res, next) => {

    // if (req.isAuthenticated) { return next() }
    // else { 
    //     console.log(`Not authenticated via passport`);
    // }
    // const token = req.cookies.authorization;

    if (!token) {
        console.log(`Token not found`);
        res.status(400).send("token Not found");
    }

    try {
        // Verify the token and decode its payload
        const decodedToken = verify(token, secretKey);
        req.user = decodedToken.user; 
        console.log(`Token verified via JWT`);
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(403)
        .json({ message: 'Invalid token' }); // redirect to /
    }
}

export default authenticateToken;
