const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 初始化环境变量
dotenv.config({ path: '../.env' });
const dbUrl = process.env.DATABASE_URL;
console.log("dbURL: " + dbUrl);


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB Atlas', err);
    });
