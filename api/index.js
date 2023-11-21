const express = require('express');
const cors = require('cors');
const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Post = require('./models/Post.js');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const { NONAME } = require('dns');
const uploadMiddleware = multer({ dest: 'uploads/' });

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use('/uploads', express.static(__dirname + '/uploads'));


mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
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
});


app.post('/login', async (req, res) => {
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
});

app.get('/profile', (req, res) => {
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
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});


app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            // author: userData.id,
    });
        res.json(postDoc); 
    });

})


app.get('/post', async (req, res) => {
    res.json(
        await Post.find()
            .populate('author', ['name'])
            .sort({createdAt: -1})    
            .limit(20)
        );
}),


app.listen(4000);