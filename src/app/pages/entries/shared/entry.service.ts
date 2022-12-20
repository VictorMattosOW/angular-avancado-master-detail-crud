import { Categoria } from './../../categorias/shared/categoria.model';
import { CategoriaService } from './../../categorias/shared/categoria.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, Observable, throwError } from 'rxjs';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath = "api/entries";

  constructor(
    private http: HttpClient,
    private categoriaService: CategoriaService
  ) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntryArray)
    )
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    );
  }

  create(entry: Entry): Observable<Entry> {
    return this.categoriaService.getById(entry.categoriaId).pipe(
      mergeMap(categoria => {
        entry.categoria = categoria;
        return this.http.post(this.apiPath, entry).pipe(
          catchError(this.handleError),
          map(this.jsonDataToEntry)
        );
      })
    )
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    return this.categoriaService.getById(entry.categoriaId).pipe(
      mergeMap(categoria => {
        entry.categoria = categoria;
        return this.http.put(url, entry).pipe(
          catchError(this.handleError),
          map(() => entry)
        )
      })
    )
  }

  delete(entries: Entry): Observable<any> {
    const url = `${this.apiPath}/${entries.id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  // METODOS PRIVADOS

  private jsonDataToEntryArray(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });
    return entries;
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  private handleError(error: any): Observable<any> {
    console.log("Erro na requisição =>, ", error);
    return throwError(error);
  }
}
