const express = require('express')
const router = express.Router()
const { User } = require('../models')
const { userAuth } = require('../middlewares')


//post requests
router.post('/register', async (req, res) => {

    try {
        let { name, email,password,phoneNo } = req.body

        let alreadyExistingUser = await User.findOne({ email })

        if (alreadyExistingUser) {

            req.flash(
                'error_msg',
                'User already exists'
            );

            return res.redirect('/user/register');
        }

        let newUser = new User({
            name,
            email,
            password,
            phoneNo
        })

        let token = await newUser.generateAuthToken(email)
       
        res.cookie('authorization', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly:false
        })

        await newUser.save()

        console.log('new User',newUser);

        res.redirect('/user/profile');

    } catch (error) {

        req.flash(
            'error_msg',
            'Internal Server Error'
        );

        return res.redirect('/user/register');
    }
})

router.post('/login', async (req, res) => {

    try {

        const { email,password } = req.body;

        const user = await User.findByCredentials(email,password);

        console.log('user',user);

        if (!user) {

            req.flash(
                'error_msg',
                'No User Found'
            );

            return res.redirect('/user/login');
        }

        let token = await user.generateAuthToken(email)
       
        res.cookie('authorization', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly:false
        })

        res.redirect('/user/profile');

    } catch (error) {

        req.flash(
            'error_msg',
            'Internal Server Error'
        );

        return res.redirect('/user/login');
    }
})

router.get('/logout', async (req, res) => {
    
    res.clearCookie('authorization')
    
    res.redirect('/user/login');
})

//get requests
router.get('/profile', userAuth, async (req, res) => {
    res.render('user', {
        user: req.user
    });
})

router.get('/login', async (req, res) => {
    res.render('login')
})


router.get('/register', async (req, res) => {
    res.render('register');
})

router.get('/edit',userAuth,async (req,res)=>{
 
    res.render('edit',{
 
        user:req.user
    })
})

//update responses 
router.put("/edit", userAuth , async (req,res)=>{
    console.log(req.body);
    try {
      const updates=Object.keys(req.body);
      const allowedUpdates=["name","phoneNo","email"];
      const isValid=updates.every((update)=>allowedUpdates.includes(update));
  
      if(!isValid){
          
        req.flash(
            'error_msg',
            'Invalid Updates'
        );

        return res.redirect('/user/profile');
      }
      
      const user = req.user;
      
      updates.forEach((update)=>user[update]=req.body[update]);
      
      await user.save();
      
      return res.redirect('/user/profile'); 
    
    } catch (error) {
    

        req.flash(
            'error_msg',
            'Internal Server Error'
        );

        return res.redirect('/user/profile');    
    }
})

module.exports = router
