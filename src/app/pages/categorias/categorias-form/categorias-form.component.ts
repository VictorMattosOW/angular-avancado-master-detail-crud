import { CategoriaService } from './../shared/categoria.service';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorias } from '../shared/categoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
// import toastr from "toastr";

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.css']
})
export class CategoriasFormComponent implements OnInit, AfterContentChecked {

  currentAction: string = '';
  categoriaForm?: FormGroup;
  pageTitle: string = '';
  serverErrorMessage: string[] = [];
  submittingForm = false;
  categoria = new Categorias();

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.biuldCategoriaForm();
    this.loadCategoria();
  }

  ngAfterContentChecked(): void {
    
  }

  private setCurrentAction() {
    this.route.snapshot.url[0].path === "new" ? this.currentAction = "new" : this.currentAction = "edit";
  }

  private biuldCategoriaForm() {
    this.categoriaForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    })
  }

  private loadCategoria() {
    if (this.currentAction === "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoriaService.getById(+params.get('id')))
      ).subscribe((categoria: Categorias) => {
        this.categoria = categoria;
      })
    }
  }
}
