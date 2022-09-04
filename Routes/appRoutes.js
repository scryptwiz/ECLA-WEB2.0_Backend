const express = require('express');
const { editProfile, connect, verifyLogin } = require('../controllers/userController');
const router = express.Router();

router.post('/user/signup', connect)
router.post('/user/verify', verifyLogin)
router.post('/user/editprofile', editProfile)

module.exports = router;