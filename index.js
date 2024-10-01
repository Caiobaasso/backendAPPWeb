import express from "express";
import rotaEvento from "./Rotas/rotasEventos.js";

const app = express();
const host = '0.0.0.0';
const port = 3001;

app.use(express.json());

app.use('/eventos', rotaEvento);

app.listen(port,host, () => {
    console.log(`Servidor rodando em http://${host}:${port}`);
})