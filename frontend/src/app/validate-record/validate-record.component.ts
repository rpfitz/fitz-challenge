import { Component, OnInit } from '@angular/core';
import { Record } from '../shared/models/record.model';
import { ValidateRecordUseCase } from './validate-record.use-case';
import { RecordStateService } from '../registers/registers.state.service';

@Component({
  selector: 'app-validate-record',
  templateUrl: './validate-record.component.html',
  styleUrls: ['./validate-record.component.css'],
})

export class ValidateRecordComponent implements OnInit {
  record: Record = {
    id: 0,
    nome: '',
    email: '',
    cpf: '',
    celular: '',
    conhecimentos: [],
    validado: false,
    status: null,
    dataValidacao: null,
  };

  responseMessage: string = '';

  constructor(
    private validateRecordUseCase: ValidateRecordUseCase,
    private recordStateService: RecordStateService
  ) { }

  ngOnInit(): void {
    const id = this.recordStateService.getRecordId();

    if (id !== null) {
      this.validateRecordUseCase.getRecord(id).subscribe({
        next: (data) => {
          this.record = data;
        },
        error: (error) => {
          console.error('Erro ao obter detalhes do record:', error);
          this.responseMessage = 'Erro ao obter detalhes do record.';
        },
      });
    } else {
      console.error('ID é nulo. Não é possível obter os detalhes do record.');
      this.responseMessage = 'ID é nulo. Não é possível obter os detalhes do record.';
    }
  }

  validationToggle() {
    const id = this.record.id;
    const valid = !this.record.validado;

    if (id !== 0) {
      this.validateRecord(id, valid);
    }
  }

  validateRecord(id: number, valid: boolean) {
    this.validateRecordUseCase.validateRecord(id, valid).subscribe({
      next: (response) => {
        this.responseMessage = `Record foi ${valid ? 'validado' : 'não validado'} com sucesso.`;
        this.updateRecord(valid, response);
      },
      error: (error) => {
        this.responseMessage = `Erro ao ${valid ? 'validar' : 'invalidar'} o record.`;
      },
    });
  }

  private updateRecord(validado: boolean, response: any) {
    this.record.validado = validado;
    this.record.status = validado ? 'Validado' : 'Não validado';
    this.record.dataValidacao = new Date();
  }
}
