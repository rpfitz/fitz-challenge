import {
  Controller,
  Post,
  Get,
  Param,
  Put,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RecordService } from '../services/record.service';
import { Record } from '../entities/record.entity';
import { CreateRecordDto } from '../dtos/record.dto';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post(':nome/registrar')
  async createRecord(@Body() recordData: CreateRecordDto): Promise<Record> {
    try {
      const record = await this.recordService.createRecord(recordData);
      return record;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: 'Ocorreu um erro ao cadastrar o registro.',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('registros')
  async getRecords(@Query('status') status?: string): Promise<Record[]> {
    return this.recordService.getRecords(status);
  }

  @Get(':id/validar')
  async getRecord(@Param('id') id: number): Promise<Record> {
    return this.recordService.getRecordBy(id);
  }

  @Put(':id/validar')
  async validateRecord(
    @Param('id') id: number,
    // @Query('validado') validado: string,
    @Body() body: { validado: boolean },
  ): Promise<void> {
    const { validado } = body;

    await this.recordService.validateRecord(id, validado);
  }
}
