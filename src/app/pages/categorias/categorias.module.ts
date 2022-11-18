import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasListaComponent } from './categorias-lista/categorias-lista.component';
import { CategoriasFormComponent } from './categorias-form/categorias-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    CategoriasListaComponent,
    CategoriasFormComponent
  ]
})
export class CategoriasModule { }
