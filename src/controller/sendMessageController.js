import "dotenv/config";
import OpenAI from "openai";


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function sendMessage(req, res){
    try {

        let optionsAnswer = 
          [
            {message: 'Olá como podemos te ajudar hoje?', value: 1},
            {message: 'Você possui alguma dúvida?', value: 2},
            {message: 'Tchau!', value: 3},
          ]
        
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-instruct-0914",
          messages: [
            {
              role: "user",
              content: `
                       ${req.body.message}
        
                        Com base na pergunta acima verifique qual objeto desse array que possui a mensagem ideal de resposta para essa pergunta
                        ${optionsAnswer}

                        Retorne apenas o conteudo de message
                        ###
                    `,
            },
          ],
          max_tokens: 30
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