import { createLLMChain, callLLMChain } from '../langchainUtility';


describe('Langchain Utility Tests', () => {
    let chain;

    beforeAll(() => {
        // Create a new LLMChain with custom prompts
        const customSystemMessage = "You are a helpful assistant specialized in conducting interviews.";
        const customHumanMessage = "{userInput}";
        chain = createLLMChain(customSystemMessage, customHumanMessage);
    });

    test('Should call LLMChain successfully', async () => {
        const params = { userInput: "Tell me about yourself." };
        const response = await callLLMChain(chain, params);

        expect(response).toBeDefined();
        expect(typeof response.text).toBe('string');
    });
});
