import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';
const router = express.Router();
dotenv.config();

//REGISTER
router.post("/register", async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      //save user and respond
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error)
    }
});


// LOGIN
router.post('/login', async (req, res)=>{
  try {
    const  user = await User.findOne({email: req.body.email});
    if(!user) return res.status(404).json("user not found");
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json("wrong password");
    const token = jwt.sign({username: user.username, id: user._id}, process.env.KEY, {expiresIn: "1h"});
    res.status(200).json({result: user, token});

  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
