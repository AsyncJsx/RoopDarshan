const adminService = require('../service/admin.service');
const  { hashPassword, comparePassword } = require('../utils/hash-password')
const  { createToken, verifyToken } = require('../utils/jwt');
const { adminModel, validateAdminModel } = require('../models/admin');
const redisClient = require('../service/redis.service')

const signUpController =async (req,res)=>{
        try {
            const { error } = validateAdminModel(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });
            const hashedPassword = await hashPassword(req.body.password)
            const admin = await adminService.createAdminService({ username: req.body.username, email:req.body.email, phone : req.body.phone, password:hashedPassword });
            const token = createToken({ id: admin._id, email: admin.email })
            
            res.cookie("authToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3 * 60 * 60 * 1000,
              });
              
            res.status(201).json({ message: 'Admin created successfully', admin: { ...admin.toObject(), password: undefined }, token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred during registration', details: error.message });
        }
}

const loginController = async (req,res) =>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const admin = await adminService.findAdminByEmail(email);
        if(! admin){
            return res.status(401).json({ error: 'Invalid Credentials' });
        }
        const isPasswordValid = await comparePassword(password, admin.password);
        if(! isPasswordValid){
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        const token =await  createToken({ id: admin._id, email: admin.email })
            
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3 * 60 * 60 * 1000,
          });
          
        res.status(201).json({ message: 'Admin Login successfully', admin: { ...admin.toObject(), password: undefined }, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const logoutController = async (req,res) =>{
    try {
        const token = req.cookies.authToken || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "No token provided. Logout failed.",
            });
        }

        await redisClient.set(token, "logout", "EX", 5 * 60 * 60);

        res.clearCookie('authToken', { httpOnly: true, secure: true });

        res.status(200).json({
            success: true,
            message: "Logout successful.",
        });

        req.admin = null;
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
}
const getAdminController = async (req, res) => {
    try {

      const admin = req.admin;
      if (!admin) {
        return res.status(400).json({
          success: false,
          message: "Unauthorized",
        });
      }
  
      res.status(200).json({
        success: true,
        admin,
      });
    } catch (error) {
      console.error("Error in getAdminController:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  
module.exports = {signUpController,loginController,logoutController,getAdminController};