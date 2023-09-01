const express = require('express');
const multer = require('multer');
const signupRoute = express.Router();
const getSignup = require("../controllers/controller.signupPage");

// File upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
})
const upload = multer({ storage: storage })

signupRoute.get('/signup1',(req,res)=>{
    res.render('signup');
})

signupRoute.get('/signup', getSignup.signup);
signupRoute.post('/signup/client', getSignup.client);
signupRoute.get('/signup/clientProfile', getSignup.clientProfile);
signupRoute.post('/signup/clientProfile/data', upload.single('picture'), getSignup.clientProfile1);

// Freelancer all router

signupRoute.get('/signup2',getSignup.signup2);
signupRoute.post('/signup2/freelancer',getSignup.freelancer);
signupRoute.post('/signup2/freelancerProfile/data', upload.single('pic'), getSignup.freelancerProfile1);
signupRoute.post('/signup2/shopInfo', getSignup.freelancerShopInfo);



module.exports = signupRoute;