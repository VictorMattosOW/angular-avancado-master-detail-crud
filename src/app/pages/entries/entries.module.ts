import { SharedModule } from './../../shared/shared.module';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListaComponent } from './entry-lista/entry-lista.component';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    SharedModule,
    EntriesRoutingModule,
    IMaskModule,
    CalendarModule
  ],
  declarations: [EntryListaComponent, EntryFormComponent],
})
export class EntriesModule { }
