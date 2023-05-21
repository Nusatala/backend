//js
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// POST request that handles register
const registerUser = (req, res) => {
    res.send("Hello This is from registerUser")
    // const {name, email, password, location, created_at} = req.body
    // if(!name || !email || !password || !location || !created_at){
    //     console.log('There is field that has empty value')
    // }
    // //Validation
    // User.findOne({ email: email }).then((user) => {
    //     if(user){
    //         console.log('email exists')
    //         res.render('register', {
    //             name,
    //             email,
    //             password,
    //             confirm,
    //         })
    //     } else {
    //         //Validation
    //         const newUser = new User({
    //             name,
    //             email,
    //             location,
    //             password,
    //         })
    //         //Password Hashing
    //         bcrypt.genSalt(10, (err, salt) => 
    //             bcrypt.hash(newUser.password, salt, (err, hash) => {
    //                 if(err) throw err;
    //                 newUser.password = hash;
    //                 newUser
    //                     .save()
    //                     .then(res.redirect('/login'))
    //                     .catch((err) => console.log(err));
    //             })
    //         );
    //     }
    // })
}

module.exports = {
    registerUser
}