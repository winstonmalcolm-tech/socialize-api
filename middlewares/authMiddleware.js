const jwt = require("jsonwebtoken");

const authorize = async (req,res, next) => {

    try {
        const token = req.headers.authorization;

        if (!token.startsWith("Bearer")) {
            res.status(400);
            throw new Error("Not valid token");
        }
    
        const decodedToken = token.split(" ")[1];

        if (!jwt.verify(decodedToken, process.env.JWT_SECRET_KEY)) {
            res.status(400);
            throw new Error("Not valid token");
        }

        req.id = jwt.decode(decodedToken).id;
        next();

    } catch(error) {
        next(error.message)
    }
}

module.exports = authorize;