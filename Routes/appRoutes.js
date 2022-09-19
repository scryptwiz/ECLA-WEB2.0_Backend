const express = require('express');
const { editProfile, connect, verifyLogin, transactionHistory, checkUsername, checkEmail, findWallet } = require('../controllers/userController');
const router = express.Router();

router.post('/user/connect', connect)
router.get('/user/verify', verifyLogin)
router.post('/user/editprofile', editProfile)
router.post('/user/findWallet', findWallet)
router.post('/user/update/email', checkEmail)
router.post('/user/update/username', checkUsername)
router.put('/user/transactionHistory', transactionHistory)

module.exports = router;
