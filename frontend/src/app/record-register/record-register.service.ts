import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Record } from '../shared/models/record.model';
import { customEnvironment } from 'src/environments/environment';

const { RECORD_API_URL } = customEnvironment

@Injectable({
  providedIn: 'root'
})

export class RecordService {
  constructor(private http: HttpClient) { }

  submitRecord(collaborator: string | null, record: Record): Observable<any> {
    const url = `${RECORD_API_URL}/${collaborator}/registrar`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, record, { headers });
  }
}
