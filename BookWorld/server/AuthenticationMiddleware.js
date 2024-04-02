const jwt = require("jsonwebtoken");

function AuthenticationMIddleware(req, res, next) {
    const token = req.header('Authorization');
    console.log("AUTH MIDDLEWARE TOKEN", token);
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        jwt.verify(token, 'your-secret-key');
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = AuthenticationMIddleware;