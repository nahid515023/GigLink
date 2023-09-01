const db = require('../models/dbConnection');
const fs = require('fs');
const path = require('path');
const { send } = require('process');

function showCategory(category, skills) {
    var cate = []
    for (var i = 0; i < category.length; i++) {
        var ok = 0;
        for (var j = 0; j < skills.length; j++) {
            if (category[i].categoryName == skills[j].skill) {
                ok = 1;
                break;
            }
        }
        if (ok == 0) {
            cate.push(category[i].categoryName);
        }
    }
    return cate;
}


const profile = (req, res) => {
    const id = req.user.id;
    // console.log(id);
    db.query('SELECT * FROM freelancerProfileInfo WHERE email = ?', [id], (err, result) => {
        if (err) console.log(err);
        db.query('SELECT skill FROM skills WHERE email = ?', [id], (err, result2) => {
            if (err) console.log(err);
            db.query('SELECT * FROM education WHERE email = ?', [id], (err, result3) => {
                if (err) console.log(err);
                db.query('SELECT * FROM rating WHERE freelacerEmail = ?', [id], (err, result4) => {
                    if (err) console.log(err);
                    db.query('SELECT * FROM Catagory', (err, result5) => {
                        if (err) console.log(err);
                        db.query('SELECT * FROM verifyProfile WHERE email = ?', [id], (err, result6) => {
                            if (err) console.log(err);


                            var msg;
                            if (result6.length == 0) {
                                msg = 'Verify your profile';

                            }
                            else {
                                if (result6[0].status == 2) {
                                    msg = 'Verified';
                                }
                                else if (result6[0].status == 1) {
                                    msg = 'Pending';
                                }
                            }


                            const reviews = result4.length;
                            var five = 0, four = 0, three = 0, two = 0, one = 0;
                            for (var i = 0; i < reviews; i++) {
                                if (result4[i].star == 5) {
                                    five += 1;
                                }
                                else if (result4[i].star == 4) {
                                    four += 1;
                                }
                                else if (result4[i].star == 3) {
                                    three += 1;
                                }
                                else if (result4[i].star == 2) {
                                    two += 1;
                                }
                                else if (result4[i].star == 1) {
                                    one += 1;
                                }
                            }
                            const ratings = [
                                { stars: 5, percentage: (five / reviews) * 100, count: five },
                                { stars: 4, percentage: (four / reviews) * 100, count: four },
                                { stars: 3, percentage: (three / reviews) * 100, count: three },
                                { stars: 2, percentage: (two / reviews) * 100, count: two },
                                { stars: 1, percentage: (one / reviews) * 100, count: one }
                            ];
                            const unselcted = showCategory(result5, result2);

                            res.render('fProfile', { data: result, skills: result2, education: result3, rating: result4, reviews, ratings, category: unselcted, verifyProfile: result6 });
                        });
                    });
                });
            });
        });
    });
}



const profileView = (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query('SELECT * FROM freelancerProfileInfo WHERE email = ?', [id], (err, result) => {
        if (err) console.log(err);
        db.query('SELECT skill FROM skills WHERE email = ?', [id], (err, result2) => {
            if (err) console.log(err);
            db.query('SELECT * FROM education WHERE email = ?', [id], (err, result3) => {
                if (err) console.log(err);
                db.query('SELECT * FROM rating WHERE freelacerEmail = ?', [id], (err, result4) => {
                    if (err) console.log(err);
                    const reviews = result4.length;
                    var five = 0, four = 0, three = 0, two = 0, one = 0;
                    for (var i = 0; i < reviews; i++) {
                        if (result4[i].star == 5) {
                            five += 1;
                        }
                        else if (result4[i].star == 4) {
                            four += 1;
                        }
                        else if (result4[i].star == 3) {
                            three += 1;
                        }
                        else if (result4[i].star == 2) {
                            two += 1;
                        }
                        else if (result4[i].star == 1) {
                            one += 1;
                        }
                    }
                    const ratings = [
                        { stars: 5, percentage: (five / reviews) * 100, count: five },
                        { stars: 4, percentage: (four / reviews) * 100, count: four },
                        { stars: 3, percentage: (three / reviews) * 100, count: three },
                        { stars: 2, percentage: (two / reviews) * 100, count: two },
                        { stars: 1, percentage: (one / reviews) * 100, count: one }
                    ];
                    res.render('freelancerProfileViews', { data: result, skills: result2, education: result3, rating: result4, reviews, ratings });
                });
            });
        });
    });
}




const freelancerProfileInfo = (req, res) => {
    const id = req.user.id;
    const name = req.body.name;
    const bio = req.body.bio;
    const description = req.body.description;
    const address = req.body.address;
    const email = req.body.email;
    const fb = req.body.facebook;
    const whatsapp = req.body.whatsapp;
    const twitter = req.body.twitter;
    var image = '';
    // Check if req.file exists
    if (!req.file) {
        image = req.body.image;
    } else {
        // Function to delete an uploaded image
        function deleteImage(imagePath) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                } else {
                    console.log('Image deleted successfully');
                }
            });
        }
        // Example usage
        const imagePath = path.join(__dirname, '../uploads', req.body.image);
        deleteImage(imagePath);
        image = req.file.filename;
    }

    // Update query
    const query = `UPDATE freelancerProfileInfo SET name = ?, image = ?, bio = ?, description = ?, address = ?, facebook = ?, whatsapp = ?, twitter = ? WHERE email = ?`;
    const values = [name, image, bio, description, address, fb, whatsapp, twitter, email];

    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
        }
        return res.redirect('/profile');
    });
}

const addskills = (req, res) => {
    var email = req.user.id;
    var skill = req.body.addSkill;
    const query = 'INSERT INTO skills SET email = ? ,skill = ?';
    const values = [email, skill];
    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
        }
        return res.redirect('/profile');
    });
}

const removeskills = (req, res) => {
    var email = req.user.id;
    var skill = req.body.removeSkill;
    const query = 'DELETE FROM skills WHERE skill =? AND email = ?';
    const values = [skill, email];
    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
        }
        return res.redirect('/profile');
    });
}

const removeEdu = (req, res) => {
    var email = req.user.id;
    var i = req.body.edu;
    db.query('SELECT * FROM education WHERE email = ?', [email], (err, result) => {
        if (err) console.log(err);
        const query = 'DELETE FROM education WHERE email = ? AND degree=? AND institute=?';
        const values = [result[i].email, result[i].degree, result[i].institute];
        db.query(query, values, (err, result2) => {
            if (err) {
                console.log(err);
            }
            return res.redirect('/profile');
        });
    });
}

const addEdu = (req, res) => {
    var email = req.user.id;
    var degree = req.body.degree;
    var institute = req.body.institute;
    const query = 'INSERT INTO education SET email = ? ,degree = ?,institute = ?';
    const values = [email, degree, institute];
    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
        }
        return res.redirect('/profile');
    });
}

const verifyProfile = (req, res) => {
    const email = req.user.id;
    const nidNumber = req.body.nid_number;
    const tradeLicenseNumber = req.body.tln;
    const nidPicture = req.files['nid_pic'][0];
    const tradeLicensePicture = req.files['tl_pic'][0];
    const status = 1;
    console.log(nidNumber, email);
    const insertQuery = 'INSERT INTO verifyProfile SET email=?, nid_number=?, trade_license_number=?, nid_picture=?, trade_license_picture=?,status=?';
    db.query(insertQuery, [email, nidNumber, tradeLicenseNumber, nidPicture.filename, tradeLicensePicture.filename, status], (err, results) => {
        if (err) {
            console.log(err);
        }
        return res.redirect('/profile');
    });
}

module.exports = { profile, profileView, freelancerProfileInfo, addskills, removeskills, removeEdu, addEdu, verifyProfile };