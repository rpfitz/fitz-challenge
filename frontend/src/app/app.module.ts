import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HeaderComponent } from './header/header.component';
import { RecordsComponent } from './registers/registers.component';
import { RecordRegisterComponent } from './record-register/record-register.component';
import { RecordStateService } from './registers/registers.state.service';
import { ValidateRecordComponent } from './validate-record/validate-record.component';

@NgModule({
  declarations: [AppComponent, RecordRegisterComponent, HeaderComponent, RecordsComponent, ValidateRecordComponent],
  imports: [AppRoutingModule, FormsModule, MatPaginatorModule, CommonModule, BrowserModule, HttpClientModule, BrowserAnimationsModule],
  providers: [AppService, RecordStateService],
  bootstrap: [AppComponent],
})
export class AppModule { }
