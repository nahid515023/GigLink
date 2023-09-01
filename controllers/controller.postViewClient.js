const db = require("../models/dbConnection");

const postViewClient = (req, res) => {
    const id = req.params.id;
    console.log(id);
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

            db.query(`SELECT * FROM bids WHERE postId = ?`, [id], (err, bids) => {

                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                db.query(`SELECT * FROM freelancerProfileInfo WHERE email = ?`, [bids[0].email], (err, freelancer) => {

                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    }
                    console.log(bids);
                    console.log(freelancer);

                    res.render('postViewClient', { title: 'View Post', data: post, profileInfo: client, bids: bids, freelancer: freelancer });
                });

            });

        });
    });
}

module.exports = postViewClient;