const jwt = require('jsonwebtoken');
const isAuthenticated = async(req, res, next) => {
    // !Get token from header
    
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    // !Verify token 
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET,(err, decoded)=>{
        if(err){
            return false;
        }else{
            return decoded;
        }
        
    });
    if(verifyToken){
        console.log(verifyToken.id);
        // !save user into req obj
        req.user = verifyToken.id;
        next();
    }else{
        const err = new Error('Token expired please login again');
        next(err);
    }
   
    // res.json({message: 'This is Auth middleware'})
  
};

module.exports = isAuthenticated;