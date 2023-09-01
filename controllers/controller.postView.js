const db = require("../models/dbConnection");

const postView = (req, res) => {
    console.log(req.body);
    const { bidPrice, comment,number, postId } = req.body;
    const email = req.user.id;
    db.query('INSERT INTO bids ( `postId`, `price`, `text`, `phone_number`, `email`) VALUES (?, ?, ?, ?,?)', [ postId, bidPrice, comment,number,email], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.redirect('/jobFeed');
    });
}



module.exports = postView;      