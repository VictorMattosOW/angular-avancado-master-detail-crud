import { Actions } from './../../categorias/shared/action.model';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string = '';
  entryForm!: FormGroup;
  pageTitle: string = '';
  serverErrorMessage: string[] | undefined;
  submittingForm = false;
  entries = new Entry();

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparetor: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  }

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abrir', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
    'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.biuldEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if(this.currentAction === 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  // private

  private setCurrentAction() {
    this.route.snapshot.url[0].path === Actions.new ? this.currentAction = Actions.new : this.currentAction = Actions.edit;
  }

  private biuldEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null],
      tipo: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      data: [null, [Validators.required]],
      pago: [null, [Validators.required]],
      categoriaId: [null, [Validators.required]],
    })
  }

  private loadEntry() {
    if (this.currentAction === Actions.edit) {
      this.route.paramMap.pipe(
        switchMap((params) => this.entryService.getById(Number(params.get('id'))))
      ).subscribe(
        (entries: Entry) => {
          this.entries = entries;
          this.entryForm.patchValue(entries);
        },
        (error) => alert('deu erro no servidor')
      )
    }
  }

  private setPageTitle() {
    if(this.currentAction === Actions.new) {
      this.pageTitle = 'Cadastrio de novo lançamento';
    } else {
      const entryNome = this.entries.nome || '';
      this.pageTitle = 'Editando lançamento: ' + entryNome;
    }
  }

  private createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.create(entry).subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    )
  }

  private updateEntry() {
    const entries: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.update(entries).subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    );
  }

  private actionsForSuccess(entry: Entry) {
    this.toastr.success('Solicitação processaada com sucesso!');
    this.router.navigateByUrl('lancamentos', {skipLocationChange:true}).then(
      () => this.router.navigate(['lancamentos', entry.id, 'edit'])
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
