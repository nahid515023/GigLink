const db = require("../models/dbConnection");

const jobPosterProfile = (req, res) => {
    const id = req.user.id;
    console.log(id);
    db.query('SELECT * FROM jobPost WHERE jobPosterId = ?', [id], (err, result) => {
        if (err) console.log(err);
        db.query('SELECT * FROM jobPosterProfile WHERE email = ?', [id], (err, profileInfo) => {
            if (err) if (err) console.log(err);
            db.query('SELECT * FROM Catagory', (err, category) => {
                res.render('jobPosterProfile', { data: result, profileInfo: profileInfo, category: category });
            });
        });
    });
}



module.exports = { jobPosterProfile };