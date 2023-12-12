const express = require('express');
const cors = require('cors');
const mongoose= require('mongoose');


const cookieParser = require('cookie-parser');

require('dotenv').config();


const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

const app = express();



app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use('/uploads', express.static(__dirname + '/uploads'));


mongoose.connect(process.env.MONGO_URL);


app.use('/userAPI', userRoutes);
app.use('/postAPI', postRoutes);

app.get('/test', (req, res) => {
    res.json('test ok');
});



app.listen(4000);