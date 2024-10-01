import Evento from "../Modelo/Evento.js";
export default class EventoCtrl{

    gravar(req,res){
        if(req.method == "POST" && req.is("application/json")){
            const dados = req.body;
            const cod = dados.cod;
            const nome = dados.nome;
            const descricao = dados.descricao;
            const data = dados.data;
            const local = dados.local;
            const preco = dados.preco;
            const imagem = dados.imagem;

            if(cod && nome && descricao && data && local && preco && imagem){
                const evento = new Evento(cod,nome,descricao,data,local,preco,imagem);

                evento.incluir().then(() =>{
                    res.status(201).json({
                        "status": true,
                        "mensagem": "Cliente incluído com sucesso!"
                    })
                }).catch((erro)=>{
                    res.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao incluir o cliente: " + erro.message
                    })
                });
            }
            else{
                res.status(400).json({
                    "status": false,
                    "mensagem": "Requisição inválida! Informe todos os dados do Evento!"
                })
            }
        }
        else
        {
            res.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação"
            })
        }
    };

    alterar(req,res){
        if(req.method == "PUT" || req.method == "PATCH" && req.is("application/json")){
            const dados = req.body;
            const cod = dados.cod;
            const nome = dados.nome;
            const descricao = dados.descricao;
            const data = dados.data;
            const local = dados.local;
            const preco = dados.preco;
            const imagem = dados.imagem;

            if(cod && nome && descricao && data && local && preco && imagem){
                const evento = new Evento(cod,nome,descricao,data,local,preco,imagem);

                evento.alterar().then(() =>{
                    res.status(200).json({
                        "status": true,
                        "mensagem": "Cliente alterado com sucesso!"
                    });
                }).catch((erro) => {
                    res.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao alterar o cliente: " + erro.message
                    });
                })    
            }
            else{
                res.status(400).json({
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação"
                })
            }
        }
        else{
            res.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação"
            });
        }
    }

    excluir(req,res){
        if(req.method == "DELETE" && req.is("application/json")){
            const dados = req.body;
            const cod = dados.cod;

            if(cod){
                const evento = new Evento(cod);
                evento.excluir().then(() =>{
                    res.status(200).json({
                        "status": true,
                        "mensagem": "Cliente excluído com sucesso!"
                    });
                }).catch((erro) => {
                    res.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o cliente: " + erro.message
                    });
                })    
            }
            else{
                res.status(400).json({
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação"
                })
            }
        }
        else{
            res.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação"
            });
        }
    }

    consultar(req,res){
        let termoBusca = req.params.termoBusca;
        if (!termoBusca){
            termoBusca = "";
        }
        if(req.method == "GET"){
            const evento = new Evento();
            evento.consultar(termoBusca).then((eventos) => {
                res.status(200).json({
                    "status": true,
                    "listaEventos": eventos
                });
            }).catch((erro) => {
                res.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar os eventos: " + erro.message
                });
            })
        }
        else{
            res.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação"
            });
        }
    }       
}