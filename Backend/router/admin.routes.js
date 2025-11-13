const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const adminAuth = require('../middleware/adminAuth');

router.post('/signup',async (req,res)=>{
    adminController.signUpController(req,res);
});

router.post('/login', async (req, res) => {
   adminController.loginController(req,res);
});
router.get('/',adminAuth, async (req, res) => {
   adminController.getAdminController(req,res);
});

router.get('/logout', async (req, res) => {
   adminController.logoutController(req,res);
});


module.exports = router;