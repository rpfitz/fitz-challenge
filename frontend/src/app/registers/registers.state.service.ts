import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecordStateService {
  private recordId: number | null = null;

  setRecordId(id: number) {
    this.recordId = id;
  }

  getRecordId(): number | null {
    return this.recordId;
  }

  clearRecordId() {
    this.recordId = null;
  }
}
