const bcryptjs = require('bcryptjs');
const User = require('../Models/User');
const { GenerateJwt } = require('../Middlewares/GenerateJwt');



exports.Signup = async (req , res , next) => {
    const username = req.body.username.toString();
    const email = req.body.email.toString();
    const password = req.body.password.toString();
    
    if(username.length === 0 || email.length === 0 || password.length === 0){
        res.status(400).json({
            message : "Please enter all the fields"
        });
    }

    else if(password.length < 8){
        res.status(400).send({
            message : "Minimum length of password should be 8"
        });
    }

    try {
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password , salt);

        const NewUser  = new User( { username , hash , email });
        try{
            const saved = await NewUser.save();
            res.status(200).json(saved);
        } catch(error){
            res.status(500).json({
                message : "User not Saved"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message : error.message
        });
    }
}



exports.Login = async(req , res , next ) => {
    const username = req.body.username.toString();
    const password = req.body.password.toString();

    if(username.length === 0 || password.length === 0){
        res.status(400).json({
            message : "Please enter all the fields"
        });
    }

    else if(password.length < 8){
        res.status(400).send({
            message : "Minimum length of password should be 8"
        });
    }

    let user = await User.findOne({ username : username });
    if(user === null){
        user = await User.findOne({email : username })
    }
    if(user === null){
        res.status(400).json({
            message : "username not found , Please SignUp!!!"
        });
    }
    else{

        try {
            const check = await bcryptjs.compare( password , user.hash);
            if(check === true){
                const AccessToken = GenerateJwt(user);
                res.status(200).json({
                    message : "Login successful " , 
                    AccessToken
                });
            }
            else{
                res.status(401).json({
                    message : "Incorrect password"
                });
            }
        } catch (error) {
            res.status(400).json({
                message : error.message
            })           
        }
    }
    
}