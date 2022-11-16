import { CategoriaService } from './../shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias-lista',
  templateUrl: './categorias-lista.component.html',
  styleUrls: ['./categorias-lista.component.css']
})
export class CategoriasListaComponent implements OnInit {

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
  }

  alert(str: string) {
    alert(str);
  }
}
