const jwt = require('jsonwebtoken');
const router = require('express').Router();
let User = require('../models/user.data');

router.route('/checkUser').post(async (req, res) => {
    const username = req.body.username;
    const user = await User.findOne({ username })
    if (user) {
        res.send("error")
    }
    else {
        res.send("unique")
    }
})

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const image = req.body.image;

    const newUser = new User({
        username,
        email,
        password,
        image
    });

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.json('Error: ' + err));
});

router.route('/login').post( async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username })
    if ((!user) || (password != user.password)){
        res.send("error")
    }else{
        const token = jwt.sign({
            username: username,
            image: user.image
        }, "togealyhFx4s20B3")
        return res.json(token)
    }
});


router.route('/getData').post( async (req, res) => {
    const token = req.body.token;
    const user = jwt.verify(token, "togealyhFx4s20B3")
    User.findOne({ username: user.username })
    .then((data) => {
        res.send({ status: "ok", data: data });
    })
    .catch((error) => {
        res.send({ status: "error", data: error});
    });
});


module.exports = router;