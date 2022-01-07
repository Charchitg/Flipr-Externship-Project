const jwt = require('jsonwebtoken');

exports.ValidateJwt = async (req , res , next ) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token);

    if(token === null || token === undefined ){
        res.status(401).json({
            message : "No access token recieved"
        });
    }

    try {
        const verify = await jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        console.log(verify);        

    } catch (error) {
        
    }
}