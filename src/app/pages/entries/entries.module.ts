import { EntryFormComponent } from './entry-form/entry-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListaComponent } from './entry-lista/entry-lista.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EntryListaComponent, EntryFormComponent],
})
export class EntriesModule { }
