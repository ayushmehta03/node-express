const express = require('express');
const router = express.Router();
const{body,validationResult} = require('express-validator')
// Corrected route path
router.get('/register', (req, res) => {
    res.render('register'); // Make sure register.ejs exists in 'views' folder
});
router.post('/register',
    body('email').trim().isEmail().isLength({min:8}),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:6})
    ,
    (req,res)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
           return  res.status(400).json({
            errors:errors.array(),
            message:'Invalid Data'
           })
        }
        
})
module.exports = router;
