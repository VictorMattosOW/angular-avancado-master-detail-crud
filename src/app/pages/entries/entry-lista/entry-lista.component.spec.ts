import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryListaComponent } from './entry-lista.component';

describe('CategoriasListaComponent', () => {
  let component: EntryListaComponent;
  let fixture: ComponentFixture<EntryListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
