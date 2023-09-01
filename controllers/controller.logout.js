
const logout = (req, res) => {
    try {
        res.clearCookie('userId');
        res.render('homepage', { msg: "" });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = logout;