import conectar from "./Conexao.js";
import Evento from "../Modelo/Evento.js";

export default class EventoDAO {

    constructor(){
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS evento (
                        cod VARCHAR(5) NOT NULL PRIMARY KEY,
                        nome VARCHAR(80) NOT NULL,
                        descricao VARCHAR(100) NOT NULL,
                        data VARCHAR(10) NOT NULL,
                        local VARCHAR(80) NOT NULL,
                        preco VARCHAR(10) NOT NULL,
                        imagem VARCHAR(100) NOT NULL);`;
            await conexao.execute(sql);
            await global.poolConexoes.releaseConnection(conexao);
            console.log("Banco de dados iniciado com sucesso!");
        } catch (erro){
            console.log("O banco de dados não pode ser iniciado");
        }
    }

    async gravar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `INSERT INTO evento (cod, nome, descricao, data, local, preco, imagem) 
                         VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                evento.cod,
                evento.nome,
                evento.descricao,
                evento.data,
                evento.local,
                evento.preco,
                evento.imagem
            ];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `UPDATE evento SET nome = ?, 
                         descricao = ?, 
                         data = ?, 
                         local = ?, 
                         preco = ?, 
                         imagem = ? 
                         WHERE cod = ?`;
            const parametros = [
                evento.nome,
                evento.descricao,
                evento.data,
                evento.local,
                evento.preco,
                evento.imagem,
                evento.cod
            ];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `DELETE FROM evento WHERE cod = ?`;
            const parametros = [ evento.cod ];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termoBusca){
        let sql = "";
        let parametros = [];
        if (termoBusca){
            sql = `SELECT * FROM evento WHERE cod = ? order by nome;`;
            parametros.push(termoBusca);
        } else {
            sql = `SELECT * FROM evento order by nome;`;
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,parametros);
        let listaEventos = [];
        for (const registro of registros){
            const evento = new Evento(
                registro.cod,
                registro.nome,
                registro.descricao,
                registro.data,
                registro.local,
                registro.preco,
                registro.imagem
            );
            listaEventos.push(evento);
        }
        await global.poolConexoes.releaseConnection(conexao);
        return listaEventos;
    }


}