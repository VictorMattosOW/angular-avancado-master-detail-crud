import { Validators } from '@angular/forms';
import { CategoriaService } from './../shared/categoria.service';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Categoria } from '../shared/categoria.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.css']
})
export class CategoriasFormComponent extends BaseResourceFormComponent<Categoria> implements OnInit {

  constructor(
    protected categoriaService: CategoriaService,
    protected injector: Injector
  ) {
    super(injector, new Categoria(), categoriaService, Categoria.fromJson)
  }

  override ngOnInit(): void {
    this.biuldResourceForm();
    super.ngOnInit();
  }

  protected biuldResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    })
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Nova Categoria";
  }

  protected override editionPageTitle(): string {
    const resourceName = this.resource.nome || "";
    return "Editando Categoria: " + resourceName;
  }
}
