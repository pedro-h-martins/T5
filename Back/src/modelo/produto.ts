export default class Produto {
    private id: string;
    public nome: string;
    public valor!: number;

    constructor(nome: string, valor: number, id?: string) {
        this.nome = nome;
        this.valor = valor;
        this.id = id || Math.random().toString(36).substr(2, 9);
    }

    public get getId(): string {
        return this.id;
    }
}