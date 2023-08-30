const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: ['HR', 'Technical', 'BOSS'],
        required: true
    },
    rounds: [
        {
            roundNumber: Number,
            interviewerId: String,
            feedback: String,
            score: Number,
            previousInteractions: [
                {
                    question: String,
                    userResponse: String,
                    interviewerFeedback: String,
                    timestamp: Date
                }
            ]
        }
    ]
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
