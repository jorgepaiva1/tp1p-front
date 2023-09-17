import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonsComponent } from './persona/persons.component';
import { Page404Component } from './pagina-error/page404.component';
import { HeaderComponent } from './cabecera/header.component';
import { CategoriesComponent } from './categorias/categories.component';
import { CreatePersonComponent } from './dialogs/create-person.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateRecordComponent } from 'src/app/dialogs/create-record.component';
import { MedicalRecordComponent } from './reporte-medico/medical-record.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { ReservationComponent } from './reservacion/reservations.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    Page404Component,
    HeaderComponent,
    CategoriesComponent,
    MedicalRecordComponent,
    ReservationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CreatePersonComponent,
    CreateRecordComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
