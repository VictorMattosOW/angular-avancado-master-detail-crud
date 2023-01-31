import { Entry } from './../shared/entry.model';
import { EntryService } from './../shared/entry.service';
import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-categorias-lista',
  templateUrl: './entry-lista.component.html',
  styleUrls: ['./entry-lista.component.css']
})
export class EntryListaComponent extends BaseResourceListComponent<Entry> {
  
  constructor(private entryService: EntryService) { super(entryService) }
}
