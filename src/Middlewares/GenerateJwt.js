const jwt = require('jsonwebtoken');


exports.GenerateJwt = ( user ) => {
    const payload = { 
        userid : user._id , 
        email : user.email
    }
    return jwt.sign( payload , process.env.ACCESS_TOKEN_SECRET , { expiresIn : process.env.EXPIRE_TIME });   
}