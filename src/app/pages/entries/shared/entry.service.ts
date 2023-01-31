import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable, mergeMap } from 'rxjs';
import { CategoriaService } from './../../categorias/shared/categoria.service';
import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    private categoriaService: CategoriaService,
    protected override injector: Injector
  ) { super('api/entries', injector, Entry.fromJson) }

  override create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSentToServer(entry, super.create.bind(this));
  }

  override update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSentToServer(entry, super.update.bind(this));
  }

  private setCategoryAndSentToServer(entry: Entry, sendFn: (entry: Entry) => Observable<Entry>): Observable<Entry> {
    return this.categoriaService.getById(entry.categoriaId).pipe(
      mergeMap(categoria => {
        entry.categoria = categoria;
        return sendFn(entry);
      })
    )
  }
}