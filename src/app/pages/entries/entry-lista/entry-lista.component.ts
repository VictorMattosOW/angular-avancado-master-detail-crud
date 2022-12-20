import { Entry } from './../shared/entry.model';
import { EntryService } from './../shared/entry.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias-lista',
  templateUrl: './entry-lista.component.html',
  styleUrls: ['./entry-lista.component.css']
})
export class EntryListaComponent implements OnInit {

  entries: Entry[] = [];
  
  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.entryService.getAll().subscribe(
      (entries: Entry[]) => {
        this.entries = entries.sort((a ,b) => b.id! - a.id!)
      },
      (error: any) => {
        alert("deu erro")
      }
    );
  }

  excluirEntries(entries: Entry) { 
    const deveDeletar = confirm("Deseja deletar essa categoria ?");

    if(deveDeletar){
      this.entryService.delete(entries).subscribe(
        () => this.entries = this.entries.filter(element => element != entries),
        () => alert("deu ruim")
      )
    }
  }
}
