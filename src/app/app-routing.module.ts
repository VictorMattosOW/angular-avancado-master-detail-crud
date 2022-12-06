import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'categorias', loadChildren: () => import('./pages/categorias/categorias.module').then(m => m.CategoriasModule) },
  { path: 'lancamentos', loadChildren: () => import('./pages/entries/entries.module').then(m => m.EntriesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
