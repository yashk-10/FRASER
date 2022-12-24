const jwt = require('jsonwebtoken');
const router = require('express').Router();
let User = require('../models/user.data');

// router.route('/').get((req, res) => {
//     User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

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
    if (!user){
        return res.json('User Not Found!')
    }
    else if (password != user.password){
        return res.json('Incorrect Password')
    }
    else{
        const token = jwt.sign({}, "togealyhFx4s20B3")
        if (res.status(201)){
            return res.json({ status: "ok", data: token})
        }
        else{
            return res.json({ status: "error", data: token})
        }
    }
});

module.exports = router;