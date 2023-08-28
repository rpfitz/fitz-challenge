import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateRecordDto } from '../dtos/record.dto';

@Injectable()
export class RecordValidationService {
  validateCreateRecord(recordData: CreateRecordDto): void {
    this.validateNome(recordData.nome);
    this.validateEmail(recordData.email);
    this.validateCPF(recordData.cpf);
    this.validateCelular(recordData.celular);
    this.validateConhecimentos(recordData.conhecimentos);
  }

  private validateNome(nome: string): void {
    if (!nome || nome.trim().length === 0 || nome.length > 100) {
      throw new HttpException(
        'Nome é obrigatório e deve ter no máximo 100 caracteres.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validateEmail(email: string): void {
    if (!email || !this.validateEmailFormat(email)) {
      // throw new HttpException('Email inválido.', HttpStatus.BAD_REQUEST);
      throw new BadRequestException('Email inválido.');
    }
  }

  private validateEmailFormat(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  private validateCPF(cpf: string): void {
    if (!cpf) {
      throw new HttpException('CPF é obrigatório.', HttpStatus.BAD_REQUEST);
    }

    // Verifica se o CPF possui o formato "000.000.000-00"
    const formatoCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!formatoCPF.test(cpf)) {
      throw new HttpException(
        "O CPF deve estar no formato '000.000.000-00'.",
        HttpStatus.BAD_REQUEST,
      );
    }

    // Remove os caracteres não numéricos e verifica se o CPF tem 11 dígitos
    const cpfNumerico = cpf.replace(/\D/g, '');
    if (cpfNumerico.length !== 11) {
      throw new HttpException(
        'CPF deve conter 11 dígitos numéricos.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validateCelular(celular: string): void {
    if (celular && !this.validateCelularFormat(celular)) {
      throw new HttpException(
        'Celular inválido. Use o formato (xx) xxxxx-xxxx.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validateCelularFormat(celular: string): boolean {
    const celularPattern = /^\(\d{2}\) \d{5}-\d{4}$/;
    return celularPattern.test(celular);
  }

  private validateConhecimentos(conhecimentos: string[]): void {
    if (
      !conhecimentos ||
      conhecimentos.length < 1 ||
      conhecimentos.length > 3
    ) {
      throw new HttpException(
        'Selecione no mínimo 1 e no máximo 3 conhecimentos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const conhecimentosValidos = [
      'Git',
      'React',
      'PHP',
      'NodeJS',
      'DevOps',
      'Banco de Dados',
      'TypeScript',
    ];

    for (const conhecimento of conhecimentos) {
      if (!conhecimentosValidos.includes(conhecimento)) {
        throw new HttpException(
          `Conhecimento '${conhecimento}' inválido.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  public validateStatus(status: string): void {
    if (status !== 'Não validado' && status !== 'Validado') {
      throw new BadRequestException('Status inválido.');
    }
  }
}
