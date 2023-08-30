const Interview = require('../models/Interview');
const User = require('../models/User');
const { generateQuestionPlan, evaluateAnswer, calculateFinalScore } = require('../utils/interviewUtility'); // Import your interview utility functions

// 1. Create Interview and Initialize First Round
const createInterview = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const user = await User.findById(userId);
        const questionPlan = generateQuestionPlan(user.uploadedCV, role); // Generate initial question plan based on CV and role

        const newInterview = new Interview({
            userId,
            role,
            rounds: [
                {
                    roundNumber: 1,
                    interviewerId: 'someInterviewerId', // Replace with actual interviewer ID
                    previousInteractions: []
                }
            ]
        });

        await newInterview.save();
        res.status(201).json({ message: 'Interview created', questionPlan });
    } catch (error) {
        res.status(500).json({ message: 'Error creating interview', error: error.message });
    }
};

// 2. Ask Question Based on User's Question Plan
const askQuestion = async (req, res) => {
    // Implementation here
};

// 3. Evaluate Answer and Update Question Plan
const evaluateAndRecord = async (req, res) => {
    try {
        const { interviewId, roundNumber, question, userResponse } = req.body;
        const interview = await Interview.findById(interviewId);

        const { feedback, score } = evaluateAnswer(question, userResponse, interview.role); // Evaluate the answer

        // Update the current round's interactions and score
        const currentRound = interview.rounds.find(round => round.roundNumber === roundNumber);
        currentRound.previousInteractions.push({ question, userResponse, interviewerFeedback: feedback, timestamp: new Date() });
        currentRound.score = score;

        await interview.save();
        res.status(200).json({ message: 'Answer evaluated and recorded', feedback, score });
    } catch (error) {
        res.status(500).json({ message: 'Error evaluating answer', error: error.message });
    }
};

// 4. Final Evaluation and Scoring
const finalizeInterview = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const interview = await Interview.findById(interviewId);

        const finalScore = calculateFinalScore(interview.rounds); // Calculate the final score based on all rounds
        const summary = `Your final score is ${finalScore} out of 100.`;

        res.status(200).json({ message: 'Interview finalized', summary });
    } catch (error) {
        res.status(500).json({ message: 'Error finalizing interview', error: error.message });
    }
};

module.exports = {
    createInterview,
    askQuestion,
    evaluateAndRecord,
    finalizeInterview
};
