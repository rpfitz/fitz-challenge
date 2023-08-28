import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordController } from './controllers/record.controller';
import { RecordService } from './services/record.service';
import { RecordValidationService } from './services/record-validation.service';
import { Record } from './entities/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  controllers: [RecordController],
  providers: [RecordService, RecordValidationService],
})
export class RecordModule {}
