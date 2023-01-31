import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Categoria } from './../shared/categoria.model';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-categorias-lista',
  templateUrl: './categorias-lista.component.html',
  styleUrls: ['./categorias-lista.component.css']
})
export class CategoriasListaComponent extends BaseResourceListComponent<Categoria>{

  constructor(private categoriaService: CategoriaService) { super(categoriaService) }
}
