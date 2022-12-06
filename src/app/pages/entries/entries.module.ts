import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListaComponent } from './entries-lista/entry-lista.component';


@NgModule({
  imports: [
    CommonModule,
    EntriesRoutingModule
  ],
  declarations: [EntryListaComponent],
})
export class EntriesModule { }
