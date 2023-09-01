const express = require('express');
const profileRoute = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const removePost = require("../controllers/controller.post");
const { profile, profileView, freelancerProfileInfo, addskills, removeskills, removeEdu, addEdu, verifyProfile} = require("../controllers/controller.profile");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
})
const upload = multer({ storage: storage })

profileRoute.get('/profile', authenticateToken, profile);
profileRoute.post('/profileInfoUpdate', authenticateToken, upload.single('picture'), freelancerProfileInfo);
profileRoute.get('/freelacerProfile/view/:id', authenticateToken, profileView);

profileRoute.post('/addSkile', authenticateToken, addskills);
profileRoute.post('/removeSkile', authenticateToken, removeskills);
profileRoute.post('/removeEdu', authenticateToken, removeEdu);
profileRoute.post('/addEdu', authenticateToken, addEdu);
profileRoute.post('/verifyProfile', authenticateToken, upload.fields([{ name: 'nid_pic', maxCount: 1 }, { name: 'tl_pic', maxCount: 1 }]), verifyProfile);

profileRoute.get('/removePost/:id', authenticateToken, removePost);

module.exports = profileRoute;