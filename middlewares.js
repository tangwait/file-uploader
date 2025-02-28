function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("can't find user (authentication)")
    res.redirect("/login");
}

module.exports = {
    isAuthenticated 
};
