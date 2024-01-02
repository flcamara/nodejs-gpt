import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/find-complexity", async (req, res) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          role: "user",
          content: `
                   hoje estou nervoso, mas ontem estava calmo!
    
                    Qual o sentimento da frase acima? Me retorne um adjetivo dessa frase.
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
});

app.listen(port, () => {
  console.log(`sistema iniciado com sucesso na porta: ${port}`);
});
