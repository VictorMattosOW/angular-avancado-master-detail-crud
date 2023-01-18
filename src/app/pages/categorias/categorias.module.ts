import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasListaComponent } from './categorias-lista/categorias-lista.component';
import { CategoriasFormComponent } from './categorias-form/categorias-form.component';


@NgModule({
  imports: [
    SharedModule,
    CategoriasRoutingModule
  ],
  declarations: [
    CategoriasListaComponent,
    CategoriasFormComponent
  ]
})
export class CategoriasModule { }
