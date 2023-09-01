const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models/dbConnection');
const dotenv = require('dotenv').config();


exports.signup = (req, res) => {
    res.render('client', { msg: "" });
}
exports.client = (req, res) => {

    var { email, password, confirm } = req.body;
    // console.log(email,password,confirm);

    db.query('SELECT email FROM clientProfile WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            return res.render('client', {
                msg: "Email already used",
            });
        }
        else if (password !== confirm) {
            return res.render('client', {
                msg: "Passwords don't match"
            });
        }
        else {
            var p = await bcrypt.hash(password, 8);
            db.query('INSERT INTO clientProfile SET ?', { password: p, email: email }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                const token = jwt.sign({ id: email }, process.env.jwt_secret);
                res.cookie('userId', token, { httpOnly: true });
                return res.render('clientProfile', { email: email });
            });
        }
    });
}

exports.clientProfile = (req, res) => {
    res.render('clientProfile');
}
// JobPoster data save in database
exports.clientProfile1 = (req, res) => {

    var image = '';
    // console.log(req.body);
    const { email, name, address, dob, gender } = req.body;
    if (req.file) {
        image = req.file.filename;
    }
    var createTime = new Date();
    db.query('INSERT INTO clientProfileInfo SET ?', { email: email, name: name, dob: dob, address: address, gender: gender, image: image, createTime: createTime }, (err, result) => {
        if (err) {
            console.log(err);
        }
        return res.status(201).redirect('/jobPosterProfile');
    });
}


exports.signup2 = (req, res) => {
    res.render('freelancer', { msg: "" });
}
exports.freelancer = (req, res) => {
    var { email, password, confirm } = req.body;
    var createTime = new Date();
    console.log(email, password, confirm);

    db.query('SELECT email FROM freelancerProfile WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            return res.render('freelancer', {
                msg: "Email already used",
            });
        }
        else if (password !== confirm) {
            return res.render('freelancer', {
                msg: "Password doesn't match"
            });
        }
        else {
            var p = await bcrypt.hash(password, 8);
            db.query('INSERT INTO freelancerProfile SET ?', { password: p, email: email, createdTime: createTime }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                const token = jwt.sign({ id: email }, process.env.jwt_secret);
                res.cookie('userId', token, { httpOnly: true });
                return res.render('freelancerProfile', { email });
            });
        }
    });
}
exports.freelancerProfile1 = (req, res) => {
    var image = '';
    const { email, name, address, dob, gender } = req.body;
    if (req.file) {
        image = req.file.filename;
    }
    var createTime = new Date();
    db.query('INSERT INTO freelancerProfileInfo SET ?', { email: email, name: name, dob: dob, address: address, gender: gender, image: image, createTime: createTime }, (err, result) => {
        if (err) {
            console.log(err);
            // res.send(err)
        }
        return res.status(201).render('shopInfo', {email});;
    });
}
exports.freelancerShopInfo = (req, res) => {
    console.log(req.body);
    const { email, location, pnumber, description } = req.body;
    db.query('INSERT INTO shopInfo SET ?', { email: email,shopAddress: location, phoneNumber: pnumber, description: description }, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
    return res.status(201).redirect('/jobFeed');
}

