import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Record } from '../shared/models/record.model';
import { customEnvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class RecordsService {
  private registrosUrl = customEnvironment.GET_RECORDS_API_URL;

  constructor(private http: HttpClient) { }

  getRecords(): Observable<Record[]> {
    return this.http.get<Record[]>(this.registrosUrl);
  }
}
