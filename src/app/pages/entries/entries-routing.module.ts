import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntryListaComponent } from './entry-lista/entry-lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EntryListaComponent
  },
  { 
    path: 'new', component: EntryFormComponent
  },
  { 
    path: ':id/edit', component: EntryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
