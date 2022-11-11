import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDatavase implements InMemoryDbService {
    createDb() {
        const categorias = [
            { id: 1, nome: "Lazer", descricao: "curtição e alopração" },
            { id: 2, nome: "Saude", descricao: "curtição e alopração" },
            { id: 3, nome: "Salario", descricao: "curtição e alopração" },
            { id: 4, nome: "Freelas", descricao: "curtição e alopração" },
            { id: 5, nome: "Comida", descricao: "curtição e alopração" }
        ];
        return { categorias }
    }
}