import "dotenv/config";
import OpenAI from "openai";


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function sendMessage(req, res){
    try {
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-0613",
          messages: [
            {
              role: "user",
              content: `
                       hoje estou nervoso, mas ontem estava calmo!
        
                        Qual o meu sentimento hoje com base na frase acima? Me fale uma dica para melhorar.
                        ###
                    `,
            },
          ],
        });
    
        return res.status(200).send({
          sucess: true,
          message: chatCompletion.choices[0].message,
        });
      } catch (error) {
        return res.status(error.status).send({
          message: error.message,
        });
      }
}

export default {sendMessage}