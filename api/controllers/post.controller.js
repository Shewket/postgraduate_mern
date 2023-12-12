
const Post = require('../models/Post.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

exports.createPost = async (req, res) => {
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
            author: userData.id,
    });
        res.json(postDoc); 
    });

}


exports.updatePost = async (req, res) => {
    let newPath = null;
    if(req.file){
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {id, title, summary, content} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(userData.id);
        if(!isAuthor) {
            return res.status(400).json('you are not the author');
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });
        res.json(postDoc); 
    });
}

exports.getPosts = async (req, res) => {
    res.json(
        await Post.find()
            .populate('author', ['name'])
            .sort({createdAt: -1})    
            .limit(20)
        );
}

exports.getPostById = async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['name']);
    res.json(postDoc);
}
