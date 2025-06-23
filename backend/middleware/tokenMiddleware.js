import jwt from "jsonwebtoken"

export default function userToken(req,res,next){
    let token = req.cookies.token

    if(!token){
        return res.status(403).json({message : 'please login'})
    }
    try{
        let decode = jwt.verify(token,process.env.SECRET)
        req.user = decode
        next();
    }catch(err){
        return res.status(500).json({message : err})
    }
}