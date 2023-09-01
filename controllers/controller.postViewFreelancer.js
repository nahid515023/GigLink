const db = require("../models/dbConnection");

const postViewClient = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    db.query(`SELECT * FROM jobPost WHERE postId = ?`, [id], (err, post) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        // console.log(post[0]);

        const email = post[0].jobPosterId;
        // console.log(email);
        db.query(`SELECT * FROM clientProfileInfo WHERE email = ?`, [email], (err, client) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            // console.log(client);
            res.render('postViewFreelancer', { title: 'View Post', data: post, profileInfo: client });
        });
    });
}



module.exports = postViewClient;