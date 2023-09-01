const db = require('../models/dbConnection');

const modarator = (req, res) => {
    db.query('SELECT * FROM verifyProfile', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const users = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].status == 1) {
                    users.push(result[i]);
                }
            }
            res.render('moderator', { users: users });
        }
    })
}
const accpet = (req, res) => {
    const email = req.params.id;
    db.query('UPDATE verifyProfile SET status = 2 WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/moderator');
        }
    });
};
const reject = (req, res) => {
    const email = req.params.id;
    db.query('DELETE FROM `verifyProfile` WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/moderator');
        }
    });
};
module.exports = { modarator, accpet, reject };