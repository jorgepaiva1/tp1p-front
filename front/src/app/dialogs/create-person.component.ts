import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Person } from '../models';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
	selector: 'app-create-person',
	templateUrl: './create-person.component.html',
	standalone: true,
	imports: [MatDialogModule, MatFormFieldModule, MatInputModule,
		FormsModule, MatButtonModule, MatSelectModule],
})
export class CreatePersonComponent {
	constructor(
		public dialogRef: MatDialogRef<CreatePersonComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Person,
	) { }

	cancel(): void {
		this.dialogRef.close();
	}

	accept(): void {
		if (Object.values(this.data).some(value => value === '')) {
			alert('Datos Incorrectos');
			return;
		}
		this.dialogRef.close(this.data);
	}
}
