import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

import { AfterContentChecked, OnInit, Injector, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Actions } from 'src/app/pages/categorias/shared/action.model';

@Injectable()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string = '';
    resourceForm: FormGroup;
    pageTitle: string = '';
    serverErrorMessage: string[] = null;
    submittingForm = false;

    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

    constructor(
        protected Injector: Injector,
        public resource: T,
        private toastr: ToastrService,
        protected jsonDataToResourceFn: (jsonData: Function) => T,
        protected resourceService: BaseResourceService<T>
    ) {
        this.route = this.Injector.get(ActivatedRoute);
        this.router = this.Injector.get(Router);
        this.formBuilder = this.Injector.get(FormBuilder);
    }

    ngOnInit(): void {
        this.setCurrentAction();
        this.biuldResourceForm();
        this.loadResource();
    }

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    submitForm() {
        this.submittingForm = true;

        if (this.currentAction === 'new') {
            this.createResource();
        } else {
            this.updateResource();
        }
    }

    protected setCurrentAction() {
        this.route.snapshot.url[0].path === Actions.new ? this.currentAction = Actions.new : this.currentAction = Actions.edit;
    }

    protected loadResource() {
        if (this.currentAction === Actions.edit) {
            this.route.paramMap.pipe(
                switchMap((params) => this.resourceService.getById(Number(params.get('id'))))
            ).subscribe({
                next: (resource) => {
                    this.resource = resource;
                },
                error: (error) => {
                    alert('deu erro no servidor');
                }
            })
        }
    }

    protected setPageTitle() {
        if (this.currentAction === Actions.new) {
            this.pageTitle = this.creationPageTitle();
        } else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected creationPageTitle(): string {
        return 'Novo';
    }

    protected editionPageTitle(): string {
        return 'Edição';
    }

    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.create(resource).subscribe({
            next: (resource) => {
                this.actionsForSuccess(resource)
            },
            error: (error) => {
                this.actionsForError(error);
            }
        })
    }

    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.update(resource).subscribe({
            next: (resource) => {
                this.actionsForSuccess(resource)
            },
            error: (error) => {
                this.actionsForError(error)
            }
        });
    }

    protected actionsForSuccess(resource: T) {
        this.toastr.success('Solicitação processaada com sucesso!');
        const baseComponentPath = this.route.snapshot.parent.url[0].path;
        this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
            () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
        )
    }

    protected actionsForError(error: any) {
        this.toastr.error('Ocorreu um erro ao processar a sua solicitação!');
        this.submittingForm = false;

        if (error.status === 422) {
            this.serverErrorMessage = JSON.parse(error._body).errors;
        } else {
            this.serverErrorMessage = ['Erro no servidor, tente mais tarde'];
        }
    }

    protected abstract biuldResourceForm(): void;
}
