const UserModel = require("../Models/UserModel")
const jwt = require("jsonwebtoken")

module.exports.verifyUser = (req, res, next) => {
    
    const token = req.cookies.jwt 
    if(token) {
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            async (err, decodedToken) => {
                if(err) {
                    res.json({status: false});
                    next();
                } else {
                    const user = await UserModel.findById(decodedToken.id);
                    if(user) res.json({ status: true, user: user.email});
                    else res.json({status: false});
                    next();
                }
            }
        );
    } else {
        res.json({status: false});
        next();
    }
}







module.exports.verifyAdmin = (req, res, next) => {

    const token = req.cookies.token 
    if(token) {
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            async (err, decodedToken) => {
                if(err) {
                    res.json({status: false});
                    next();
                } else {
                    const user = await UserModel.findById(decodedToken.id);
                    if(user) res.json({ status: true});
                    else res.json({status: false});
                    next();
                }
            }
        );
    } else {
        res.json({status: false});
        next();
    }
}