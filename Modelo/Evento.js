import EventoDAO from "../DAO/EventoDAO.js"; 
export default class Evento{
    //atributos privados
    #cod
    #nome
    #descricao
    #data
    #local
    #preco
    #imagem

    constructor(cod,nome,descricao, data, local, preco, imagem){
        this.#cod = cod;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#data = data;
        this.#local = local;
        this.#preco = preco;
        this.#imagem = imagem;
    }

    //Metodos gets e sets

    get cod(){
        return this.#cod;
    }

    set cod(novoCod){
        this.#cod = novoCod;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    }

    get data(){
        return this.#data;
    }

    set data(novaData){
        this.#data = novaData;
    }

    get local(){
        return this.#local;
    }

    set local(novoLocal){
        this.#local = novoLocal;
    }

    get preco(){
        return this.#preco;
    }

    set preco(novoPreco){
        this.#preco = novoPreco;
    }

    get imagem(){
        return this.#imagem;
    }

    set imagem(novaImagem){
        this.#imagem = novaImagem;
    }

    //Metodo toString
    toString(){
        return `Cod: ${this.#cod}
                Nome: ${this.#nome}
                Descrição: ${this.#descricao}
                Data: ${this.#data}
                Local: ${this.#local}
                Preço: ${this.#preco}
                Imagem: ${this.#imagem}`;
    }

    toJSON(){
        return {
            cod: this.#cod,
            nome: this.#nome,
            descricao: this.#descricao,
            data: this.#data,
            local: this.#local,
            preco: this.#preco,
            imagem: this.#imagem
        }
    }

    async incluir(){
        const eventoDAO = new EventoDAO();
        await eventoDAO.gravar(this);
    }

    async alterar(){
        const eventoDAO = new EventoDAO();
        await eventoDAO.alterar(this);
    }

    async excluir(){
        const eventoDAO = new EventoDAO();
        await eventoDAO.excluir(this);
    }

    async consultar(termoBusca){
        const eventoDAO = new EventoDAO();
        return await eventoDAO.consultar(termoBusca);
    }
}