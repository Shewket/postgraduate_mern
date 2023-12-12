const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');



const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try{
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    }catch(err){
        res.status(422).json(err);
    }
}

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passwordMatch = bcrypt.compareSync(password, userDoc.password);
        if (passwordMatch) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token ).json(userDoc);
            })
            
        }else{
            res.status(422).json('password not match!');
        }
    } else{
        res.json('Not Found')
    }
}


exports.getProfile = async (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, email, id} = await User.findById(userData.id);
            res.json({name, email, id});
        })
    }else{
        res.json(null)
    }
}

exports.logoutUser = async (req, res) => {
    res.cookie('token', '').json(true);
}

