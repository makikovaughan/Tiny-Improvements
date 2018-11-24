const User = require('../models/User');
const Kudo = require('../models/Kudos');

module.exports = function (app) {

    //Get all user information including 
    app.get("/api/users", function (req, res) {

        User.find({})
            .populate('kudos')
            .then(function (dbUser) {
                res.json(dbUser);
            })
            .catch(function (error) {
                res.json({ Error: error });
            });

    });

    //Get the user information based on the ID.
    app.get('/api/users/:id', function (req, res) {
        User.find({ _id: req.params.id })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    //Insert the user information
    app.post("/api/users", function (req, res) {
        User.create(req.body)
            .then(function (dbUser) {
                res.json({ Created: dbUser });
            })
            .catch(function (error) {
                res.json({ Error: error });
            });

    });

    //Get all Kudos information
    app.get("/api/kudos", function (req, res) {

        Kudo.find({})
            .then(function (dbKudo) {
                res.json(dbKudo);
            })
            .catch(function (error) {
                res.json({ Error: error });
            })

    });

    //Create a kudo document and then update the user document.
    app.post("/api/kudos", function (req, res) {
        const userId = req.body.to_user;

        const newKudos = {
            title: req.body.title,
            body: req.body.body,
            from_user: req.body.from_user,
            to_user: req.body.to_user
        }

        Kudo.create(newKudos)
            .then(function (kudoData) {
                return User.findOneAndUpdate({ _id: userId }, { $push: { kudos: kudoData._id } }, { new: true });
            })
            .then(function (userData) {
                res.json(userData);
            })
            .catch(function (error) {
                res.json({ Error: error });
            })

    });

}