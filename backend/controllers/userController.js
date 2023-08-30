const User = require('../models/User');
const { performOCR } = require('../utils/ocrUtility');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// 初始化环境变量
//dotenv.config({ path: '..../.env' });
console.log("JWT Secret in userController: ", process.env.JWT_SECRET);

exports.registerLogin = async (req, res) => {
    console.log(req.body);

    const { username, email, password } = req.body;

    try {
        // Try to find the user first
        let user = await User.findOne({ email });

        if (user) {
            // User exists, attempt to login
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                // Generate JWT token
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ token, user });
            } else {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        }

        // If user doesn't exist, proceed to register
        const hashedPassword = await bcrypt.hash(password, 12);

        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate JWT token for the new user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user });

    } catch (error) {
        console.error("Error in registerLogin:", error);
        res.status(500).json({ error: error.message });
    }
};



// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(204).json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Upload CV for a user
exports.uploadCV = async (req, res) => {
    try {
        const userId = req.params.id;
        const pdfPath = req.file.path;
        const extractedText = await performOCR(pdfPath);

        await User.findByIdAndUpdate(userId, { uploadedCV: extractedText });

        res.status(200).json({ message: 'CV uploaded and processed successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get interview history for a user
exports.getInterviewHistory = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('interviewHistory.interviewId');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ interviewHistory: user.interviewHistory });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
