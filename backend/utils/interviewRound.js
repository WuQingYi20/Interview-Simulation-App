class InterviewRound {
    constructor(role, cvData, jobDescription, previousFeedback = null) {
        this.role = role;
        this.cvData = cvData; // Parsed CV data
        this.jobDescription = jobDescription; // Job description data
        this.previousFeedback = previousFeedback; // Feedback from previous rounds
        this.questions = []; // List of planned questions
        this.currentQuestion = null; // Current question being asked
        this.userResponse = null;
        this.feedback = null;
        this.score = null;
    }

    // Method to initially plan questions based on CV and job description
    async planInitialQuestions() {
        const prompt = `As a ${this.role}, plan initial interview questions based on the following CV: ${this.cvData} and job description: ${this.jobDescription}.`;
        this.questions = await callGPT3API(prompt);
    }

    // Method to adjust questions based on previous rounds' feedback
    adjustQuestions() {
        if (this.previousFeedback) {
            // Logic to adjust questions based on previous feedback
            // For example, if the previous feedback suggests the candidate is strong in algorithms,
            // you might remove or adjust the difficulty of algorithm-related questions.
        }
    }

    // Method to pick the next question from the planned list
    pickNextQuestion() {
        // Logic to pick the next question, could be random or based on some criteria
        this.currentQuestion = this.questions.shift(); // For simplicity, picking the first question
    }

    // Method to evaluate the user's response using GPT-3.5 Turbo
    async evaluateResponse() {
        const prompt = `As a ${this.role}, how would you evaluate the following response to your question: "${this.userResponse}"?`;
        this.feedback = await callGPT3API(prompt);
        this.adjustScore(); // Adjust the score based on the feedback
    }

    // Method to adjust the score based on the feedback
    adjustScore() {
        // Logic to adjust the score based on the feedback
        // For example, if the feedback is positive, increase the score, otherwise decrease it.
    }
}