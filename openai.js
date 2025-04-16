const OpenAI = require('openai')
const dotenv = require('dotenv')
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function chatToOpenAI(text) {

  const prompt = `
    Given following user conversation:
    ${text}

    Please extract following information in JSON Format:
    time: <time of the meeting in following format: Day(indonesian), dd-mmm-yyyy hh:mm:ss to dd-mmm-yyyy hh:mm:ss>,
    participant{}: <list of meeting participant contains name and talktime in percent in an object>,
    topics[]: <list of topic, discussed>,
    summary: <summary of the meeting>,
    actionable{}: <array list of actionable, contains: actionable, deadline>,
    sentiment[]: <object of following enum: {positive: if the conversation is encouraging, and positive vibes }, {negative: if the conversation is upset, angry, disbelief or any negative consent }, {neutral: you can not determine the sentiment} and value in percent>
    
    ALWAYS response in JSON Format
    `

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt
          },
        ],
      },
    ],
    temperature: 0,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "json_object",
    },
  });

  console.log(response)

  const res = response.choices[0].message.content;
  const parsedResult = JSON.parse(res);

  return parsedResult
};
