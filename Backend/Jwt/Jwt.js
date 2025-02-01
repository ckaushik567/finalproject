const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuth = (req,res,next) =>{
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(404).json({message:"Token Not Found"})
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "Access denied" });
    }

    try {
        const varifyToken = jwt.verify(token,process.env.JWT_SECRET);
        req.user = varifyToken;
        next()
    } catch (error) {
        console.log(error)
        res.status(201).json({message:"Invalid Token"})
    }
}

const generateToken = (userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports = {jwtAuth,generateToken}