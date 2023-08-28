import { Component, OnInit, ViewChild } from '@angular/core';
import { RecordsService } from './registers.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { RecordStateService } from './registers.state.service';
import { Record } from '../shared/models/record.model'

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.css'],
})

export class RecordsComponent implements OnInit {
  records: Record[] = [];
  filteredRecords: Record[] = [];
  searchTerm: string = '';
  filterStatus: string = '';
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private recordsService: RecordsService,
    private recordStateService: RecordStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords() {
    this.recordsService.getRecords().subscribe((records: Record[]) => {
      this.records = records;
      this.updateFilteredRecords();
      this.paginator.length = this.filteredRecords.length;
      this.paginator.firstPage();
      this.filteredRecords = this.records.slice(0, this.pageSize);
    });
  }

  updateFilteredRecords() {
    this.filteredRecords = this.records.filter((registro) => {
      const nameIncludsTerm = registro.nome
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const statusMatchesFilter =
        !this.filterStatus || registro.status === this.filterStatus;

      return nameIncludsTerm && statusMatchesFilter;
    });
  }

  searchRecords() {
    this.updateFilteredRecords();
    this.paginator.firstPage();
    this.paginator.length = this.filteredRecords.length;
  }

  getStatusTextColor(status: string | null): string {
    return status === 'Validado' ? 'green' : 'red';
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredRecords = this.records.slice(startIndex, endIndex);
  }

  createValidationRoute(registro: Record) {
    this.recordStateService.setRecordId(registro.id);
    this.router.navigate([this.formatName(registro.nome), 'validar']);
  }

  formatName(nome: string): string {
    return nome;
  }
}
