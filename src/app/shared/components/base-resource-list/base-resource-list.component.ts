import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { OnInit, Injectable } from '@angular/core';

@Injectable()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];

    constructor(
        protected resourceService: BaseResourceService<T>
    ) { }

    ngOnInit(): void {
        this.resourceService.getAll().subscribe(
            (resources: T[]) => {
                this.resources = resources.sort((a, b) => b.id! - a.id!)
            },
            (error) => {
                alert("deu erro");
            }
        );
    }

    deleteResources(resources: T) {
        const deveDeletar = confirm("Deseja deletar esse item ?");

        if (deveDeletar) {
            this.resourceService.delete(resources).subscribe({
                next: (resources) => {
                    this.resources = this.resources.filter(element => element != resources);
                },
                error: (error) => {
                    alert("deu ruim");
                }
            })
        }
    }
}
