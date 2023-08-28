import { Injectable } from '@angular/core';
import { ValidateRecordService } from './validate-record.service';
import { Record } from '../shared/models/record.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateRecordUseCase {

  constructor(private validateRecordService: ValidateRecordService) {}

  validateRecord(id: number, valid: boolean): Observable<any> {
    return this.validateRecordService.validateRecord(id, valid);
  }

  getRecord(id: number): Observable<Record> {
    return this.validateRecordService.getRecord(id);
  }
}
