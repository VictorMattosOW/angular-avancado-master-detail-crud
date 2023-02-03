import { Entry } from './pages/entries/shared/entry.model';
import { Categoria } from './pages/categorias/shared/categoria.model';
import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categorias: Categoria[] = [
            { id: 1, nome: "Lazer", descricao: "curtição e alopração" },
            { id: 2, nome: "Saude", descricao: "curtição e alopração" },
            { id: 3, nome: "Salario", descricao: "curtição e alopração" },
            { id: 4, nome: "Freelas", descricao: "curtição e alopração" },
            { id: 5, nome: "Comida", descricao: "curtição e alopração" }
        ];

        const entries: Entry[] = [
            { id: 1, nome: 'Gas', categoriaId: categorias[0].id, categoria: categorias[0], pago: false, data: '12/01/2023', valor: '78,80', tipo: 'expense', descricao: 'vamos tentar'} as Entry,
            { id: 2, nome: 'Gas', categoriaId: categorias[0].id, categoria: categorias[0], pago: true, data: '12/01/2023', valor: '78,80', tipo: 'renevue'} as Entry,
            { id: 3, nome: 'Gas', categoriaId: categorias[0].id, categoria: categorias[0], pago: true, data: '12/01/2023', valor: '78,80', tipo: 'expense'} as Entry,
            { id: 4, nome: 'Gas', categoriaId: categorias[0].id, categoria: categorias[0], pago: true, data: '12/01/2023', valor: '78,80', tipo: 'expense'} as Entry,
            { id: 5, nome: 'Gas', categoriaId: categorias[0].id, categoria: categorias[0], pago: true, data: '12/01/2023', valor: '78,80', tipo: 'expense'} as Entry,
            { id: 6, nome: 'Gas', categoriaId: categorias[0].id, categoria: categorias[0], pago: true, data: '12/01/2023', valor: '78,80', tipo: 'expense'} as Entry,
            { id: 7, nome: 'Gas', categoriaId: categorias[0].id, categoria: categorias[0], pago: true, data: '12/01/2023', valor: '78,80', tipo: 'expense'} as Entry
        ]
        return { categorias, entries }
    }
}