import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordRegisterComponent } from './record-register/record-register.component';
import { RecordsComponent } from './registers/registers.component';
import { ValidateRecordComponent } from './validate-record/validate-record.component';

const routes: Routes = [
  { path: ':collaborator/registrar', component: RecordRegisterComponent },
  { path: 'registros', component: RecordsComponent },
  { path: ':collaborator/validar', component: ValidateRecordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
