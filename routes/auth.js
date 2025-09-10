const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const passwordRegex = /(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}/;

router.post("/signup",
  body("name").isLength({ min: 20, max: 60 }),
  body("email").isEmail(),
  body("password").matches(passwordRegex),
  body("address").isLength({ max: 400 }).optional({ nullable: true }),
  async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const { name, email, password, address } = req.body;
    try{
      const exists = await User.findOne({ where: { email } });
      if(exists) return res.status(400).json({ message: "Email exists" });
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ name,email,password:hash,address,role:"user" });
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn:"8h" });
      return res.json({ token, user: { id:user.id,email:user.email,role:user.role,name:user.name } });
    }catch(err){ console.error(err); res.status(500).json({ message:"Server error" }); }
  }
);

router.post("/login",
  body("email").isEmail(),
  body("password").exists(),
  async (req,res) => {
    const { email, password } = req.body;
    try{
      const user = await User.findOne({ where:{ email } });
      if(!user) return res.status(401).json({ message:"Invalid credentials" });
      const ok = await bcrypt.compare(password,user.password);
      if(!ok) return res.status(401).json({ message:"Invalid credentials" });
      const token = jwt.sign({ id:user.id, role:user.role }, process.env.JWT_SECRET, { expiresIn:"8h" });
      return res.json({ token, user:{ id:user.id, email:user.email, role:user.role, name:user.name }});
    }catch(err){ console.error(err); res.status(500).json({ message:"Server error" }); }
  }
);

module.exports = router;
