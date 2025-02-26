

function loadHomepage(req, res) {
    res.render("index");
};

function loadLogin(req, res) {
    res.render("login");
};

function loadRegister(req, res) {
    res.render("register");
};






module.exports = {
    loadHomepage,
    loadLogin,
    loadRegister
}