const chatToOpenAI = require('./openai');

module.exports = async function processTranscript(transcript) {
    try {
        const result = await chatToOpenAI(transcript);

        if (!result || typeof result !== 'object') {
            throw new Error('Invalid response from OpenAI');
        }

        return result;
    } catch (error) {
        console.error('Error processing transcript:', error);
        throw error; 
    }
};
