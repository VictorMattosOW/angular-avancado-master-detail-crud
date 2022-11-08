import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasListaComponent } from './categorias-lista/categorias-lista.component';
import { CategoriasFormComponent } from './categorias-form/categorias-form.component';


@NgModule({
  imports: [
    CommonModule,
    CategoriasRoutingModule
  ],
  declarations: [
    CategoriasListaComponent,
    CategoriasFormComponent
  ]
})
export class CategoriasModule { }
