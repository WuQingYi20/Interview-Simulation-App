const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    uploadedCV: {
        type: String,
        required: false
    },
    interviewHistory: [
        {
            interviewId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Interview'
            },
            timestamp: Date
        }
    ]
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
