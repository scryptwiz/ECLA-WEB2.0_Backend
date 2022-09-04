const usersModel = require("../Models/dbSchema");

const signup = (req,res) => {
    let {username, publicAddress} = req.body;
    if (!username|| !publicAddress) {
        res.json({status: false, message:"All fields must be filled"})
    } else {
        const signupInfo = new usersModel({ username, publicAddress })
        signupInfo.save((err) => {
            if (!err) { 
                res.json({message: "Signed up successfully", status: true})
            } else if (err) {
                res.json({message: err.message, status: false})
                res.json(req.body)
            }
        })
    }
}

module.exports = {signup}