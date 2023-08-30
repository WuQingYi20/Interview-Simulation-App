const { createLLMChain, callLLMChain } = require('./langchainUtility');
const ChainManager = require('./chainManager');

// Function to Generate Question Plan
const generateQuestionPlan = async (uploadedCV, role) => {
    let chain = ChainManager.getChain('questionPlan');

    if (!chain) {
        const systemMessage = `Generate a question plan based on the role ${role} and the uploaded CV ${uploadedCV}.`;
        const humanMessage = 'Please generate the question plan.';
        chain = createLLMChain(systemMessage, humanMessage);
        ChainManager.addChain('questionPlan', chain);
    }

    const params = { role, uploadedCV };
    const questionPlan = await callLLMChain(chain, params);
    return questionPlan;
};

// Function to Evaluate Answer
const evaluateAnswer = async (question, userResponse, role) => {
    let chain = ChainManager.getChain('evaluateAnswer');

    if (!chain) {
        const systemMessage = `Evaluate the answer based on the role ${role}.`;
        const humanMessage = 'Please evaluate the answer.';
        chain = createLLMChain(systemMessage, humanMessage);
        ChainManager.addChain('evaluateAnswer', chain);
    }

    const params = { question, userResponse, role };
    const evaluation = await callLLMChain(chain, params);
    return evaluation;
};

// Function to Calculate Final Score
const calculateFinalScore = async (rounds) => {
    let chain = ChainManager.getChain('calculateFinalScore');

    if (!chain) {
        const systemMessage = 'Calculate the final score based on the completed interview rounds.';
        const humanMessage = 'Please calculate the final score.';
        chain = createLLMChain(systemMessage, humanMessage);
        ChainManager.addChain('calculateFinalScore', chain);
    }

    const params = { rounds };
    const finalScore = await callLLMChain(chain, params);
    return finalScore;
};

module.exports = {
    generateQuestionPlan,
    evaluateAnswer,
    calculateFinalScore
};
