import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordRegisterComponent } from './record-register.component';

describe('RecordRegisterComponent', () => {
  let component: RecordRegisterComponent;
  let fixture: ComponentFixture<RecordRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordRegisterComponent]
    });
    fixture = TestBed.createComponent(RecordRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
