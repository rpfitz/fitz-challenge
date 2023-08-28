import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { customEnvironment } from 'src/environments/environment';

const { RECORD_API_URL } = customEnvironment
 
@Injectable({
  providedIn: 'root'
})
export class ValidateRecordService {
  constructor(private http: HttpClient) { }

  getRecord(id: number): Observable<any> {
    return this.http.get(`${RECORD_API_URL}/${id}/validar`);
  }

  validateRecord(id: number, valid: boolean): Observable<any> {
      return this.http.put(`${RECORD_API_URL}/${id}/validar`, {
      validado: valid,
    })
  }
}
