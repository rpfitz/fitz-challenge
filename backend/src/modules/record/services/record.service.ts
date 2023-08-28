import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from '../entities/record.entity';
import { CreateRecordDto } from '../dtos/record.dto';
import { RecordValidationService } from './record-validation.service';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly validationService: RecordValidationService,
  ) {}

  // define which one will use validado or status
  async createRecord(recordData: CreateRecordDto): Promise<Record> {
    this.validationService.validateCreateRecord(recordData);

    const existingRecord = await this.recordRepository.findOne({
      where: { cpf: recordData.cpf },
    });

    if (existingRecord) {
      throw new HttpException('CPF já registrado.', HttpStatus.BAD_REQUEST);
    }

    const newRecord = this.recordRepository.create({
      ...recordData,
      validado: false,
      status: 'Não validado',
    });

    return this.recordRepository.save(newRecord);
  }

  async getRecords(status?: string): Promise<Record[]> {
    if (status) {
      this.validationService.validateStatus(status);
      return this.recordRepository.find({ where: { status } });
    } else {
      return this.recordRepository.find({ order: { nome: 'ASC' } });
    }
  }

  async getRecordBy(id: number): Promise<Record> {
    const record = await this.recordRepository.findOne({ where: { id } });

    if (!record) {
      throw new NotFoundException('Registro não encontrado.');
    }

    return record;
  }

  async validateRecord(id: number, validado: boolean): Promise<void> {
    const record = await this.getRecordBy(id);

    record.validado = validado;
    record.status = record.validado ? 'Validado' : 'Não validado';
    record.dataValidacao = new Date();

    await this.recordRepository.save(record);
  }
}
