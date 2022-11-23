import { Categoria } from './../shared/categoria.model';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-categorias-lista',
  templateUrl: './categorias-lista.component.html',
  styleUrls: ['./categorias-lista.component.css']
})
export class CategoriasListaComponent implements OnInit {

  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.getAll().subscribe(
      (categorias: Categoria[]) => {
        this.categorias = categorias;
      },
      (error: any) => alert("deu erro")
    );
  }

  excluirCategoria(categoria: Categoria) { 
    const deveDeletar = confirm("Deseja deletar essa categoria ?");

    if(deveDeletar){
      this.categoriaService.delete(categoria).subscribe(
        () => this.categorias = this.categorias.filter(element => element != categoria),
        () => alert("deu ruim")
      )
    }
  }
}
