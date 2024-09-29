import Evento from "./Modelo/Evento.js";

const evento = new Evento("1", "Show de Rock Internacional", "Venha curtir as maiores bandas de rock em um evento inesquecível!", "05/12/2024", "Arena São Paulo", "250", "img/show.webp");

/*
evento.incluir().then(() =>{
    console.log("Incluido com sucesso");
}).catch((erro) =>{
    console.log(erro);
}); */

evento.consultar("1").then((listaEventos)=>{
    for (const evento of listaEventos){
        console.log(evento.toString());
    }
}).catch((erro) =>{
    console.log("Erro ao consultar os eventos: " + erro);
}) 