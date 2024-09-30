const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCM-0GDq6naA4fFAfJLjK3HmPVl5PF2iEg");
const GEMINI_API_KEY = 'AIzaSyCM-0GDq6naA4fFAfJLjK3HmPVl5PF2iEg';

const geminiService = {
    generate: async (prompt: string) => {
        return genAI.generate(prompt);
    }
};


export const generateData = async (originalText: string) => {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
    });

    const prompt = `Please read the above news article and provide a detailed and paraphrased version of it. Ensure the paraphrased content retains the original meaning but is expressed in different words and phrases. The detailed paraphrased news should be clear, concise, and informative ( Remove the # or any symbol when starting the content ): "${originalText}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return text;
}
