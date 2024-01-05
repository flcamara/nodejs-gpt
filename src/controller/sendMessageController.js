import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function sendMessage(req, res) {
  try {
   
    let optionsAnswer = [
      { message: "Olá seja bem-vindo ao nosso canal de suporte. Me chamo Ana. Qual motivo do contato?", value: 1 },
      { message: "Certo. Verifique os dados do mailing por gentileza.", value: 2 },
      { message: "Entendi. Verifique se a fila esta ativada", value: 3 },
      { message: "Fico feliz em saber que você conseguiu resolver! 😊 Se surgir qualquer outra dúvida ou problema no futuro, não hesite em entrar em contato. Estamos aqui para ajudar. Tenha um ótimo dia!", value: 4 },
    ];

    let optionsAnswerMessages = "";

    for (let i = 0; i < optionsAnswer.length; i++) {
      optionsAnswerMessages += optionsAnswer[i].message + "\n";
    }

    // console.log(optionsAnswerMessages)

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          role: "user",
          content: `
              ${req.body.message}
    
              Com base na lista de mensagens abaixo, escolha apenas uma que se encaixe melhor para a mensagem acima
               ${optionsAnswerMessages}
    
              Responda apenas com a mensagem que foi escolhida
               ###
           `,
        },
      ],
      max_tokens: 30,
      stop: ['\n']
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

export default { sendMessage };
