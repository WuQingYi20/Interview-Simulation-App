const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const multer = require('multer'); // For file uploads
const authenticateJWT = require('../middleware/authenticateJWT');

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // Assuming uploads directory exists
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/registerLogin', userController.registerLogin);

// Get all users
router.get('/', UserController.getAllUsers);

// Get a user by ID
router.get('/:id', UserController.getUserById);

// Update a user
router.put('/:id', UserController.updateUser);

// Delete a user
router.delete('/:id', UserController.deleteUser);

// Upload CV for a user
router.post('/:id/uploadCV', authenticateJWT, upload.single('cv'), UserController.uploadCV);

// Get interview history for a user
router.get('/:id/interviewHistory', UserController.getInterviewHistory);

module.exports = router;
