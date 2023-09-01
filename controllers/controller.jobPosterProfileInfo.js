const db = require("../models/dbConnection");
const fs = require('fs');
const path = require('path');

const jobPosterProfileInfo = (req, res) => {
    console.log(req.body);
    const id = req.user.id;
    const name = req.body.name;
    const bio = req.body.bio;
    const description = req.body.description;
    const address = req.body.address;
    const email = req.body.email;
    const fb = req.body.facebook;
    const linkedin = req.body.linkedin;
    const twitter = req.body.twitter;
    var image = '';

    // Assuming you have established a MySQL database connection and assigned it to a variable called 'connection'

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
    const query = `UPDATE clientProfileInfo SET name = ?, image = ?, bio = ?, description = ?, address = ?, facebook = ?, linkedin = ?, twitter = ? WHERE email = ?`;
    const values = [name, image, bio, description, address, fb, linkedin, twitter, email];

    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
        }
        return res.redirect('/jobPosterProfile');
    });
}
module.exports = jobPosterProfileInfo;