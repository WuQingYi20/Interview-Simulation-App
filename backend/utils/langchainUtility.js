const { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } = require("langchain/prompts");
const { LLMChain } = require("langchain/chains");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const dotenv = require('dotenv');
const path = require('path');

// 初始化环境变量
const envPath = path.join(__dirname, '..', '..', '.env');
console.log("envPath: " + envPath)
dotenv.config({ path: envPath });
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log("openai api key: " + OPENAI_API_KEY)

// Initialize OpenAI Chat Model
const chat = new ChatOpenAI({ temperature: 0 });

// Function to create a new LLMChain
const createLLMChain = (systemMessage, humanMessage) => {
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(systemMessage),
        HumanMessagePromptTemplate.fromTemplate(humanMessage),
    ]);

    return new LLMChain({
        prompt: chatPrompt,
        llm: chat,
    });
};

// Function to call the LLMChain
const callLLMChain = async (chain, params) => {
    return await chain.call(params);
};

module.exports = { createLLMChain, callLLMChain };

