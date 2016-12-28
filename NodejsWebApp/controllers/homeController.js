(function (homeController) {

    var data = require("../services");

    homeController.init = function (app) {
        app.get("/home/data", function (req, res) {
            data.getUsers(function (err, results) {
                res.render("index", { data: results });
            });
        });

        app.post("/home/newuser", function (req, res) {
            var userId = req.body.userId;
            var userName = req.body.name;
            var user = { userId: userId, userName: userName };
            data.createNewUser(user, function (err, result) {
                if (err) {

                } else {
                    res.render("userAdded", { data: result, error: err });
                }
            });
        });

    }

})(module.exports);