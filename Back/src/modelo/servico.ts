export default class Servico {
    private id: string;
    public nome: string;
    public preco!: number;

    constructor(nome: string, preco: number, id?: string) {
        this.nome = nome;
        this.preco = preco;
        this.id = id || Math.random().toString(36).substr(2, 9);
    }

    public get getId(): string {
        return this.id;
    }
}