import "dotenv/config";
import express from "express";
import route from './src/routes/index.js'


const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api', route)
app.listen(port, () => {
  console.log(`sistema iniciado com sucesso na porta: ${port}`);
});
