const db = require("../models/dbConnection");


const postRemove = (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query(`DELETE FROM jobPost WHERE postId = ?`, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        console.log(result);
        res.redirect('/jobPosterProfile');
    });
}
const postEditer = (req, res) => {
    const id = req.params.id;
    console.log(id);
    const text = req.body.text;
    db.query(`UPDATE FROM jobPost WHERE postId = ?`, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        console.log(result);
        res.redirect('/jobPosterProfile');
    });
};

module.exports = postRemove;