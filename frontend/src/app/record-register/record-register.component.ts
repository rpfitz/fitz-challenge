import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from './record-register.service';

@Component({
  selector: 'app-record-register',
  templateUrl: './record-register.component.html',
  styleUrls: ['./record-register.component.css']
})

export class RecordRegisterComponent {
  collaborator: string | null = null;
  interactedWCheckboxes = false;
  cellPhoneIsValid = false;
  validKnowledges = false;

  knowledgeOptions = [
    'Git',
    'React',
    'PHP',
    'NodeJS',
    'DevOps',
    'Banco de Dados',
    'TypeScript'
  ];
  record: any = {
    nome: '',
    email: '',
    cpf: '',
    celular: '',
    conhecimentos: [] as string[],
  };
  responseMsg = {
    name: 'Nome é obrigatório.',
    email: 'Email é obrigatório e deve ser um email válido (exemplo: exemplo@email.com).',
    cpf: 'CPF é obrigatório e deve estar no formato 000.000.000-00.',
    cellphone: 'Celular deve estar no formato (xx) xxxxx-xxxx.',
    knowledges: 'Selecione no mínimo 1 e no máximo 3 conhecimentos.',
    success: '',
    error: '',
  };

  constructor(
    private route: ActivatedRoute,
    private recordService: RecordService
  ) { }

  ngOnInit(): void {
    const collaboratorParam = this.route.snapshot.paramMap.get('collaborator');
    if (collaboratorParam !== null) {
      this.collaborator = collaboratorParam;
    }
  }

  onSubmit() {
    this.recordService.submitRecord(this.collaborator, this.record).subscribe(
      (response: any) => {
        this.responseMsg.success = 'Registro enviado com sucesso.';
        this.responseMsg.error = '';
        setTimeout(() => {
          this.resetForm();
        }, 3000);
      },
      (error: any) => {
        console.error('Erro ao enviar o registro', error);
        this.responseMsg.error = error.error.message;
        this.responseMsg.success = '';
      }
    );
  }

  resetForm() {
    this.record = {
      nome: '',
      email: '',
      cpf: '',
      celular: '',
      conhecimentos: [] as string[],
    };

    this.cellPhoneIsValid = false;
    this.validKnowledges = false;


    this.responseMsg = {
      name: '',
      email: '',
      cpf: '',
      cellphone: '',
      knowledges: '',
      success: '',
      error: '',
    };
  }

  formatCPF() {
    // Remove todos os caracteres não numéricos, mantendo apenas números
    let value = this.record.cpf.replace(/[^\d]/g, '');

    // Limita o valor a 11 caracteres (incluindo a máscara)
    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    // Aplica a formatação somente se houver 11 caracteres
    if (value.length === 11) {
      value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6, 9) + '-' + value.substring(9, 11);
    }

    this.record.cpf = value;

    this.validateCPF();
  }

  validateCPF() {
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    this.responseMsg.cpf = cpfPattern.test(this.record.cpf) ? '' : 'CPF deve estar no formato 000.000.000-00 e conter exatamente 14 caracteres.';
  }

  formatCellPhone(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  
    if (value.length > 11) {
      value = value.substring(0, 11); // Limita a entrada a 11 caracteres
    }
  
    if (value.length >= 2) {
      value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
    }
    if (value.length >= 10) {
      value = value.substring(0, 10) + '-' + value.substring(10, 14);
    }
  
    input.value = value;
    this.record.celular = value;
  
    this.validateCellPhoneFormat();
  }
  
  validateCellPhoneFormat() {
    const celularPattern = /^\(\d{2}\) \d{5}-\d{4}$/;
    this.cellPhoneIsValid = celularPattern.test(this.record.celular);
  
    // Se o formato não for válido, exibir mensagem de erro imediatamente
    if (!this.cellPhoneIsValid) {
      this.responseMsg.cellphone = 'Celular deve estar no formato (xx) xxxxx-xxxx.';
    } else {
      this.responseMsg.cellphone = '';
    }
  }

  hasSelectedKnowledge() {
    this.validKnowledges = this.interactedWCheckboxes && (this.record.conhecimentos.length < 1 || this.record.conhecimentos.length > 3);
    return this.validKnowledges;
  }

  updateKnowledge(knowledge: string) {
    const index = this.record.conhecimentos.indexOf(knowledge);

    if (index === -1) {
      this.record.conhecimentos.push(knowledge);
    } else {
      this.record.conhecimentos.splice(index, 1);
    }

    this.interactedWCheckboxes = true;
  }
}
