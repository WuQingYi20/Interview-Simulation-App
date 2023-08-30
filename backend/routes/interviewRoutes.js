const express = require('express');
const router = express.Router();
const {
    createInterview,
    askQuestion,
    evaluateAndRecord,
    finalizeInterview
} = require('../controllers/interviewController');

// 1. Create Interview and Initialize First Round
router.post('/create', createInterview);

// 2. Ask Question Based on User's Question Plan
router.get('/:interviewId/askQuestion', askQuestion);

// 3. Evaluate Answer and Update Question Plan
router.post('/:interviewId/evaluateAndRecord', evaluateAndRecord);

// 4. Final Evaluation and Scoring
router.get('/:interviewId/finalize', finalizeInterview);

module.exports = router;
