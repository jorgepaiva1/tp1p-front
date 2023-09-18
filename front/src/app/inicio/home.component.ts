import { Component } from '@angular/core';
import { Category, MedicalRecord, Person, Reservation } from '../models';
import { Time } from "@angular/common";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent {
	loadData(): void {
		let persons: Person[] = [];
		let categories: Category[] = [];
		let person1 = new Person(1, 'Sole', 'Decoud', '595982398838', 'sole@gmail.com', '4673829', true);
		let person2 = new Person(2, 'Jorge', 'Paiva', '59584979383', 'jorge@gmail.com', '5647827', true);
    let person3 = new Person(3, 'Emmanuel', 'Gonzalez', '59592039829', 'ema@gmail.com', '4376287', false);
    let person4 = new Person(4, 'Maria', 'Gonzalez', '595764837', 'maria@gmail.com', '64839283', false);
		let category1 = new Category(1, 'Categoria 1');
		let category2 = new Category(2, 'Categoria 2');
		persons.push(person1);
		persons.push(person2);
    persons.push(person3);
    persons.push(person4);
		categories.push(category1);
		categories.push(category2);
    const records: MedicalRecord[] = [
      {
        category: category1,
        patient: person1,
        doctor: person2,
        date: new Date(),
        diagnostic: 'Bronquitis',
        id: 1,
      },
      {
        category: category2,
        patient: person3,
        doctor: person4,
        date: new Date("2023-09-02 00:00:00"),
        diagnostic: 'Gripe',
        id: 2,
      },
    ];
    const reservations: Reservation[] = [
      {
        patient: person1,
        doctor: person2,
        date: new Date("2023-09-02 00:00:00"),
        time: {hours: 10, minutes: 0} as Time,
        id: 1,
      },
      {
        patient: person1,
        doctor: person2,
        date: new Date("2023-09-01 00:00:00"),
        time: {hours: 11, minutes: 0} as Time,
        id: 2,
      },
      {
        patient: person3,
        doctor: person4,
        date: new Date("2023-09-02 00:00:00"),
        time: {hours: 10, minutes: 0},
        id: 3,
      },
    ];
    localStorage.setItem('persons', JSON.stringify(persons));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('medicalRecords', JSON.stringify(records));
    localStorage.setItem('reservations', JSON.stringify(reservations))
		alert("Datos Iniciales Cargados Correctamente");
	}

	eraseData(): void {
		localStorage.clear();
		alert("Datos Borrados Correctamente");
	}
}
