const express = require('express');
const { editProfile, connect, verifyLogin, transactionHistory } = require('../controllers/userController');
const router = express.Router();

router.post('/user/connect', connect)
router.post('/user/verify', verifyLogin)
router.post('/user/editprofile', editProfile)
router.put('/user/transactionHistory', transactionHistory)

module.exports = router;
