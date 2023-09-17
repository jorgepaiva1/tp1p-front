import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsComponent } from './persona/persons.component';
import { HomeComponent } from './inicio/home.component';
import { Page404Component } from './pagina-error/page404.component';
import { CategoriesComponent } from './categorias/categories.component';
import { MedicalRecordComponent } from 'src/app/reporte-medico/medical-record.component';
import { ReservationComponent } from 'src/app/reservacion/reservations.component';

const routes: Routes = [
	{ path: 'persons', component: PersonsComponent },
	{ path: 'categories', component: CategoriesComponent },
	{ path: 'medical-records', component: MedicalRecordComponent },
	{ path: 'reservations', component: ReservationComponent },
	{ path: '', component: HomeComponent },
	{ path: '**', pathMatch: 'full', component: Page404Component },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
