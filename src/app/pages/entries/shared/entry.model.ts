import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Categoria } from './../../categorias/shared/categoria.model';
export class Entry extends BaseResourceModel {
    constructor(
        public override id?: number,
        public nome?: string,
        public descricao?: string,
        public tipo?: string,
        public valor?: string,
        public data?: string,
        public pago?: boolean,
        public categoriaId?: number,
        public categoria?: Categoria
    ){ super ()}

    static readonly types = {
        expense: 'Despesa',
        revenue: 'Receita'
    }

    get paidText(): string {
        return this.pago ? 'Pago' : 'Pendente';
    }
}