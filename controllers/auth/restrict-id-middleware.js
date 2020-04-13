const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    if(req.decodedToken && req.decodedToken.id){
        if(req.decodedToken.id == req.params.id){
            next()
        }else {
            res.status(403).json({error:"You are not authorized."})
        }
    }

}