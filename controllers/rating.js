const db = require("../models/dbConnection");

const ratingSubmit = (req, res) => {
    console.log(req.body);
    const star = req.body.rating;
    const femail = req.body.email;
    const text = req.body.review;
    const cemail = req.user.id;
    const cpic = req.body.image;
    const cname = req.body.cname;
    const postId = req.body.postId;
    db.query(`INSERT INTO rating (freelacerEmail,clientEmail,clientPic,clientName,star,text,postId) VALUES (?,?,?,?,?,?,?)`, [femail, cemail,cpic,cname,star,text,postId], (err, result) => {
        res.redirect('/post/'+postId);
    });
};
module.exports = ratingSubmit;