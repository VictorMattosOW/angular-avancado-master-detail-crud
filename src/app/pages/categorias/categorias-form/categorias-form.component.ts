import { Actions } from './../shared/action.model';
import { CategoriaService } from './../shared/categoria.service';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorias } from '../shared/categoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.css']
})
export class CategoriasFormComponent implements OnInit, AfterContentChecked {

  currentAction: string = '';
  categoriaForm!: FormGroup;
  pageTitle: string = '';
  serverErrorMessage: string[] | undefined;
  submittingForm = false;
  categoria = new Categorias();

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.biuldCategoriaForm();
    this.loadCategoria();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if(this.currentAction === 'new') {
      this.createCategoria();
    } else {
      this.updateCategoria();
    }
  }

  // private

  private setCurrentAction() {
    this.route.snapshot.url[0].path === Actions.new ? this.currentAction = Actions.new : this.currentAction = Actions.edit;
  }

  private biuldCategoriaForm() {
    this.categoriaForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    })
  }

  private loadCategoria() {
    if (this.currentAction === Actions.edit) {
      this.route.paramMap.pipe(
        switchMap((params) => this.categoriaService.getById(Number(params.get('id'))))
      ).subscribe(
        (categoria: Categorias) => {
          this.categoria = categoria;
          this.categoriaForm.patchValue(categoria);
        },
        (error) => alert('deu erro no servidor')
      )
    }
  }

  private setPageTitle() {
    if(this.currentAction === Actions.new) {
      this.pageTitle = 'Cadastrio de nova categoria';
    } else {
      const categoriaNome = this.categoria.nome || '';
      this.pageTitle = 'Editando Categoria: ' + categoriaNome;
    }
  }

  private createCategoria() {
    const categoria: Categorias = Object.assign(new Categorias(), this.categoriaForm.value);

    this.categoriaService.create(categoria).subscribe(
      categoria => this.actionsForSuccess(categoria),
      error => this.actionsForError(error)
    )
  }

  private updateCategoria() {
    const categoria: Categorias = Object.assign(new Categorias(), this.categoriaForm.value);

    this.categoriaService.update(categoria).subscribe(
      categoria => this.actionsForSuccess(categoria),
      error => this.actionsForError(error)
    );
  }

  private actionsForSuccess(categoria: Categorias) {
    this.toastr.success('Solicitação processaada com sucesso!');
    this.router.navigateByUrl('categorias', {skipLocationChange:true}).then(
      () => this.router.navigate(['categorias', categoria.id, 'edit'])
    )
  }

  private actionsForError(error: any) {
    this.toastr.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;

    if(error.status === 422){
      this.serverErrorMessage = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessage = ['Erro no servidor, tente mais tarde'];
    }
  }
}
