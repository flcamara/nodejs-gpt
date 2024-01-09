import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function sendMessage(req, res) {
  try {
 
    let setup =  `Você é um assistente de academia. Você ira auxiliar um novo aluno e indicar treinos com base nos membros que ele desejar treinar`

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          role: "user",
          content: `
              ${setup}

              ${req.body.message}
    
              Responda de maneira objetiva
               ###
           `,
        },
      ],
      max_tokens: 100,
      // stop: ['\n']
    });

    return res.status(200).send({
      success: true,
      message: chatCompletion.choices[0].message,
    });
  } catch (error) {
    return res.status(error.status).send({
      message: error.message,
    });
  }
}

export default { sendMessage };
