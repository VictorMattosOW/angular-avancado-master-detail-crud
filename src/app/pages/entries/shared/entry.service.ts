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
  ) { super('api/entries', injector) }

  override create(entry: Entry): Observable<Entry> {
    return this.categoriaService.getById(entry.categoriaId).pipe(
      mergeMap(categoria => {
        entry.categoria = categoria;
        return super.create(entry);
      })
    )
  }

  override update(entry: Entry): Observable<Entry> {
    return this.categoriaService.getById(entry.categoriaId).pipe(
      mergeMap(categoria => {
        entry.categoria = categoria;
        return super.update(entry);
      })
    )
  }

  // METODOS PRIVADOS

  protected override jsonDataToResources(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });
    return entries;
  }

  protected override jsonDataToResource(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }
}