import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable, mergeMap, map } from 'rxjs';
import { CategoriaService } from './../../categorias/shared/categoria.service';
import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import  * as moment from "moment"; 

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

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter(entry => {
      const entryDate = moment(entry.data, 'DD/MM/YYYY');
      const monthMatches = entryDate.month() + 1 === month;
      const yearMatches = entryDate.year() === year;

      if(monthMatches && yearMatches) return entry;
      else return null;
    })
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