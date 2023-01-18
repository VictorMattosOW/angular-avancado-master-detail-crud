import { SharedModule } from './../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListaComponent } from './entry-lista/entry-lista.component';
import { ReactiveFormsModule } from '@angular/forms';
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
