(function (data) {
    var seedData = require("./seedData");
    var database = require("./database");

    data.getUsers = function (next) {
        //get data from DB
        //next(null, seedData.initialData);
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.users.find().toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                })
            }


        });
    }

    data.createNewUser = function (item, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                var user = { user: item.userId, name: item.userName };
                db.users.insert(user, function (err) {
                    if (err) {
                        console.log("Uable to insert new user", err);
                        next(err, null);
                    } else {
                        next(null, { name: item.userName });
                    }
                });
            }

        });
    }

    function seedDatabase() {
        database.getDb(function (err, db) {
            if (err) {
                console.log(err);
            } else {
                console.log('');
                db.users.count(function (err, count) {
                    if (err) {
                        console.log("Error while getting collection" + err);
                    } else {
                        if (count === 0) {
                            console.log("seeding db");
                            seedData.initialData.users.forEach(function (item) {
                                db.users.insert(item, function (err) {
                                    if (err) {
                                        console.log("Failed to insert into DB");
                                    }
                                });
                            });
                        } else {
                            console.log("DB already seeded")
                        }
                    }

                });
                //db.
            }
        });
    }

    seedDatabase();
})(module.exports);
