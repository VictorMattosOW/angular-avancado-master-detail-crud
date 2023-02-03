import { CategoriaService } from './../../categorias/shared/categoria.service';
import { EntryService } from './../../entries/shared/entry.service';
import { Entry } from './../../entries/shared/entry.model';
import { Categoria } from './../../categorias/shared/categoria.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expenseTotal = 0;
  revenueTotal = 0;
  balance = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  categories: Categoria[] = [];
  entries: Entry[] = [];

  @ViewChild('month') month: ElementRef = null;
  @ViewChild('year') year: ElementRef = null;

  constructor(private entryService: EntryService, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.getAll().subscribe({
      next: (categorias) => {
        this.categories = categorias;
      }
    });
  }

  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if (!month || !year) {
      alert('Você precisa selecionar o mês e o ano para gerar os relatótios');
    } else {
      this.entryService.getByMonthAndYear(month, year).subscribe(this.setValues.bind(this));
    }
  }

  private setValues(entries: Entry[]) {
    
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if (entry.tipo == 'revenue') {
        revenueTotal += currencyFormatter.unformat(entry.valor, { code: 'BRL' });
      } else {
        revenueTotal += currencyFormatter.unformat(entry.valor, { code: 'BRL' });
      }
    });

    this.expenseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL' });
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL' });
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, { code: 'BRL' });
  }

  private setChartData() {
    this.revenueChartData = this.getChartData('revenue', 'Gráfico de receitas', '#9CCC65');
    this.expenseChartData= this.getChartData('expense', 'Gráfico de despesas', '#e03131');
  }

  private getChartData(entryType: string, title: string, color: string) {
    const chartData = [];
    this.categories.forEach(category => {
      const filteredEntries = this.entries.filter(
        entry => (entry.categoriaId == category.id) && (entryType === 'revenue')
      );

      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce((total, entry) => total + currencyFormatter.unformat(entry.valor, { code: 'BRL' }), 0);
        chartData.push({
          categoryName: category.nome,
          totalAmount: totalAmount
        });
      }
    });

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [
        {
          label: title,
          backgroundColor: color,
          data: chartData.map(item => item.totalAmount),
        }
      ]
    }
  }
}
