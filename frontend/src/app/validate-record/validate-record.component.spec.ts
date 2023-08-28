import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ValidateRecordComponent } from './validate-record.component';
import { ValidateRecordUseCase } from './validate-record.use-case';
import { RecordStateService } from '../registers/registers.state.service';
import { Record } from '../shared/models/record.model';
import { throwError } from 'rxjs';
import { RouterModule } from '@angular/router';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [ValidateRecordComponent],
    imports: [HttpClientTestingModule],
    // todo
  }).compileComponents();
});

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [ValidateRecordComponent],
    imports: [HttpClientTestingModule, RouterModule.forRoot([])],
    // todo
  }).compileComponents();
});

describe('ValidateRecordComponent', () => {
  let component: ValidateRecordComponent;
  let fixture: ComponentFixture<ValidateRecordComponent>;
  let validateRecordUseCase: ValidateRecordUseCase;
  let recordStateService: RecordStateService;
  let router: Router;

  const mockRegistro: Record = {
    id: 1,
    nome: 'Teste',
    email: 'teste@teste.com',
    cpf: '123456789',
    celular: '1234567890',
    conhecimentos: ['Angular', 'JavaScript'],
    validado: false,
    status: null,
    dataValidacao: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidateRecordComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Fake ID de record nos parâmetros da rota
            paramMap: of({ get: () => '1' })
          }
        },
        RecordStateService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    validateRecordUseCase = TestBed.inject(ValidateRecordUseCase);
    recordStateService = TestBed.inject(RecordStateService);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve and display record details', () => {
    spyOn(validateRecordUseCase, 'getRecord').and.returnValue(of(mockRegistro));

    component.ngOnInit();

    expect(validateRecordUseCase.getRecord).toHaveBeenCalledWith(1);
    expect(component.record).toEqual(mockRegistro);
  });

  it('should toggle validacao and update record', () => {
    spyOn(validateRecordUseCase, 'validateRecord').and.returnValue(of({}));

    component.record = mockRegistro;
    component.validationToggle();

    expect(validateRecordUseCase.validateRecord).toHaveBeenCalledWith(1, true);
    expect(component.responseMessage).toContain('validado com sucesso');
    expect(component.record.validado).toBeTrue();
  });

  it('should handle error when retrieving record details', () => {
    spyOn(validateRecordUseCase, 'getRecord').and.returnValue(
      throwError(() => new Error('Erro ao obter record'))
    );

    component.ngOnInit();

    expect(validateRecordUseCase.getRecord).toHaveBeenCalledWith(1);
    expect(component.responseMessage).toContain('Erro ao obter detalhes do record');
  });

  it('should handle error when toggling validacao', () => {
    spyOn(validateRecordUseCase, 'validateRecord').and.returnValue(
      throwError(() => new Error('Erro ao validar record'))
    );

    component.record = mockRegistro;
    component.validationToggle();

    expect(validateRecordUseCase.validateRecord).toHaveBeenCalledWith(1, true);
    expect(component.responseMessage).toContain('Erro ao validar o record');
  });
});
