const db = require("../models/dbConnection");

const jobPosterProfile = (req, res) => {
    const id = req.user.id;
    db.query('SELECT * FROM jobPost WHERE jobPosterId = ?', [id], (err, result) => {
        if (err) console.log(err);
        db.query('SELECT * FROM clientProfileInfo WHERE email = ?', [id], (err, profileInfo) => {
            if (err) if (err) console.log(err);
            db.query('SELECT * FROM Catagory', (err, category) => {
                console.log(category);
                res.render('jobPosterProfile', { data: result, profileInfo: profileInfo, category: category });
            });
        });
    });
}

const clientProfileView = (req, res) => {
    var id = req.params.id;
    db.query('SELECT * FROM jobPost WHERE jobPosterId = ?', [id], (err, result) => {
        if (err) console.log(err);
        db.query('SELECT * FROM clientProfileInfo WHERE email = ?', [id], (err, profileInfo) => {
            if (err) if (err) console.log(err);
            db.query('SELECT * FROM Catagory', (err, category) => {
                console.log(profileInfo);
                res.render('otherViewsProfile', { data: result, profileInfo: profileInfo, category: category });
            });
        });
    });
}
module.exports = { jobPosterProfile, clientProfileView };