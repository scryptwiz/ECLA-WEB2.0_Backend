const usersModel = require("../Models/dbSchema");
const jwt = require('jsonwebtoken');
const { trusted } = require("mongoose");

const connect = (req,res) => {
    let {walletAddress} = req.body;
    if (!walletAddress) {
        res.json({status: false, message:"All fields must be filled"})
    } else {
        const connectInfo = new usersModel({ walletAddress })
        connectInfo.save((err) => {
            if (!err) {
                jwt.sign({walletAddress}, process.env.JWT_SECRET, {expiresIn: "30d"}, (err, token)=>{
                    if(err){
                        {err.message=="jwt expired"? res.json({message: "Session timed out, kindly connect you wallet", status: false}) : res.json({message:'Network Error', status:false});}
                    }else {
                        res.json({message:"Registered Succesfully" ,token, status: true})
                    } 
                })
            } else if (err) {
                if (err.keyPattern.walletAddress == 1) {
                    usersModel.findOne({walletAddress}, async(error,result)=>{
                        if (error) {
                            res.json({message: "Network Error", status:false})
                        } else if (result) {
                            // jwt.sign({walletAddress}, process.env.JWT_SECRET, {expiresIn: "30d", issuer: "localhost:3000"}, (err, token)=>{
                            jwt.sign({walletAddress}, process.env.JWT_SECRET, {expiresIn: "30d"}, (err, token)=>{
                                if(err){
                                    {err.message=="jwt expired"? res.json({message: "Session timed out, kindly connect you wallet", status: false}) : res.json({message:'Network Error', status:false});}
                                }else {
                                    res.json({message:"Login Succesfully" ,token, status: true})
                                } 
                            })
                        }
                    })
                } else {
                    res.json({message: "Network Error", status: false})
                }
            }
        })
    }
}

const verifyLogin = (req,res) => {
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET,(err, decoded)=>{
        if(err){
            res.json({message:'Token no gree verify', status:false})
        } else {
            if (decoded) {
                res.json({message:decoded, status:true})
            }
        }
    })
}

const checkUsername = (req,res)=>{
    let {username,walletAddress} = req.body;
    if (username.length>0) {
        usersModel.findOne({username,walletAddress:!walletAddress}, async(err,result)=>{
            if (err) {
                res.json({message:"Network Error",status:false})
            } else if (result) {
                res.json({message:"Username aleady taken by another user", status:false})
            } else if (result==null) {
                res.json({status: true})
            }
        })
    } else {
        res.json({status: true})
    }
} 

const checkEmail = (req,res)=>{
    let {email,walletAddress} = req.body;
    if (email.length>0) {
        usersModel.findOne({email,walletAddress:!walletAddress}, async(err,result)=>{
            if (err) {
                res.json({message:"Network Error",status:false})
            } else if (result) {
                res.json({message:"email aleady taken by another user", status:false})
            } else if (result==null) {
                res.json({status: true})
            }
        })
    } else {
        res.json({status: true})
    }
}

const findWallet = (req,res) =>{
    let { walletAddress } = req.body;
    usersModel.findOne({walletAddress}, async(error,result)=>{
        if (error) {
            res.json({message: "Network Error", status:false})
        } else if (result) {
            res.json({result, status: true})
        }
    })
}

const editProfile = async (req,res) => {
    let {email, profileImage, username, walletAddress,updateEmail,updateUsername} = req.body;
    if (updateEmail || updateUsername) {
        usersModel.updateOne({walletAddress},{email,profileImage,username}, {new:true},(err)=>{
            if(err){
                res.json({message:err.message, status:false})
            } else {
                res.json({message:"Updated successfully", status:true})
            }
        })
    } else {
        res.json({message:"All fields has to be filled", status:false})
    }
}

const transactionHistory = (req,res) =>{
    let {walletAddress,product} =req.body
    usersModel.updateOne({walletAddress}, {$push:{transactionHistory:product}}, (error)=>{
        if (error) {
            res.json({status:false, message:err.message})
        } else {
            res.json({status: true, message:"Transaction History Added Successfully"})
        }
    })
}


module.exports = {connect, editProfile, verifyLogin, transactionHistory,checkUsername, checkEmail, findWallet}
