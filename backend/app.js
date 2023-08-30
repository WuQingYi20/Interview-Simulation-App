const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// 初始化环境变量
dotenv.config({ path: '../.env' });
const dbUrl = process.env.DATABASE_URL;
console.log("JWT Secret: ", process.env.JWT_SECRET);
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


// Import routes
const userRoutes = require('./routes/userRoutes');
const interviewRoutes = require('./routes/interviewRoutes');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// File upload settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/interviews', interviewRoutes);

// Upload route for CV
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error');
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
