import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Categorias } from './shared/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiPath = "api/categorias";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Categorias[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategoriasArray)
    )
  }

  getById(id: number): Observable<Categorias> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategorias)
    );
  }

  create(categorias: Categorias): Observable<Categorias> {
    return this.http.post(this.apiPath, categorias).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategorias)
    );
  }

  update(categorias: Categorias): Observable<Categorias> {
    const url = `${this.apiPath}/${categorias.id}`;

    return this.http.put(url, categorias).pipe(
      catchError(this.handleError),
      map(() => categorias)
    )
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  // METODOS PRIVADOS

  private jsonDataToCategoriasArray(jsonData: any[]): Categorias[] {
    const categorias: Categorias[] = [];
    jsonData.forEach(element => categorias.push(element as Categorias));
    return categorias;
  }

  private jsonDataToCategorias(jsonData: any): Categorias {
    return jsonData as Categorias;
  }

  private handleError(error: any): Observable<any> {
    console.log("Erro na requisição =>, ", error);
    return throwError(error);
  }
}
