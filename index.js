import "dotenv/config";
import express from "express";
import route from './src/routes/index.js'
import cors from 'cors'


const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api', route)
app.listen(port, () => {
  console.log(`sistema iniciado com sucesso na porta: ${port}`);
});
