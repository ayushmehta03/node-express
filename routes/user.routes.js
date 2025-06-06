const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register',
    [
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
        body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    ],
    async (req, res) => {
        console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid Data'
            });
        }

        const { email, username, password } = req.body;
        const hashPassword=  await bcrypt.hash(password,10)
        try {
            const newUser = await userModel.create({ email, username,password:hashPassword});
            return res.status(200).json(newUser);
        } catch (err) {
            return res.status(500).json({ error: 'Server error' });
        }
    }
);

router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login', 
   [ body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:3}),
   ],
   async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400),json({
            error:errors.array(),
            message:"Invalid Details"

        })
    }
    const {username,password}=req.body;
    const user= await userModel.findOne({
        username:username
    })
    if(!user){
        return res.status(400).json({
            message:"UserName or Pawword is incorrect"
        })
    }
    const isMatch= await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.status(400).json({
            message:"UserName or Pawword is incorrect"
        })
    }
    const token=jwt.sign({
      userId:user._id,
        email:user.email,
        username:user.username
       } ,
    process.env.JWT_SECRET

    
)
    
    res.cookie('token',token)
    res.send('LoggedIn')
    }

    
    
)

module.exports = router;
