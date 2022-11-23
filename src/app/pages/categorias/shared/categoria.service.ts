import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiPath = "api/categorias";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Categoria[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategoriasArray)
    )
  }

  getById(id: number): Observable<Categoria> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategorias)
    );
  }

  create(categorias: Categoria): Observable<Categoria> {
    return this.http.post(this.apiPath, categorias).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategorias)
    );
  }

  update(categorias: Categoria): Observable<Categoria> {
    const url = `${this.apiPath}/${categorias.id}`;

    return this.http.put(url, categorias).pipe(
      catchError(this.handleError),
      map(() => categorias)
    )
  }

  delete(categorias: Categoria): Observable<any> {
    const url = `${this.apiPath}/${categorias.id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  // METODOS PRIVADOS

  private jsonDataToCategoriasArray(jsonData: any[]): Categoria[] {
    const categorias: Categoria[] = [];
    jsonData.forEach(element => categorias.push(element as Categoria));
    return categorias;
  }

  private jsonDataToCategorias(jsonData: any): Categoria {
    return jsonData as Categoria;
  }

  private handleError(error: any): Observable<any> {
    console.log("Erro na requisição =>, ", error);
    return throwError(error);
  }
}
