import { Categoria } from './categoria.model';
import { Injectable } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseResourceService<Categoria> {

  constructor(protected override injector: Injector) { 
    super("api/categorias", injector, Categoria.fromJson);
  }
}
