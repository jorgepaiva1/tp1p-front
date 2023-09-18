import { Component,ElementRef,ViewChild, OnInit } from '@angular/core';
import { Category, MedicalRecord, MedicalRecordFilters } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecordComponent } from '../dialogs/create-record.component';
import * as XLSX from 'xlsx';
//import * as jsPDF from 'jspdf';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-record',
  templateUrl: './medical-record.component.html',
})
export class MedicalRecordComponent implements OnInit {
  allRecords: MedicalRecord[] = [];
  filteredRecords: MedicalRecord[] = [];
  categories: Category[] = [];

  tableFilters: MedicalRecordFilters = {};

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshList();
    this.getCategories();
  }

  getCategories() {
    const categoriesStr = localStorage.getItem('categories') ?? '[]';
    this.categories = JSON.parse(categoriesStr);
  }
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateRecordComponent, {
      width: '380px',
      data: {
        availableDoctors: JSON.parse(localStorage.getItem('persons') ?? '[]').filter((person: any) => person.flag_is_doctor),
        patients: JSON.parse(localStorage.getItem('persons') ?? '[]').filter((person: any) => !person.flag_is_doctor),
        existingReservations: JSON.parse(localStorage.getItem('reservations') ?? '[]'),
        allCategories: JSON.parse(localStorage.getItem('categories') ?? '[]'),
        medicalRecord: {} as MedicalRecord,
      },
    });
    dialogRef.afterClosed().subscribe((record) => {
      if (!record) return;
      record.id = this.allRecords.length + 1;
      this.allRecords.push(record);
      this.filteredRecords.push(record);
      this.save();
    });
  }

  refreshList(): void {
    const medicalRecordsStr = localStorage.getItem('medicalRecords') ?? '[]';
    this.allRecords = JSON.parse(medicalRecordsStr);
    this.filteredRecords = this.allRecords;
  }

  filter(): void {
    this.filteredRecords = this.allRecords;
    const {
      patient,
      doctor,
      categoryId,
      dateFrom: date_from,
      dateTo: date_to,
    } = this.tableFilters;
    if (patient) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) =>
          record.patient.name.includes(patient) ||
          record.patient.lastName.includes(patient)
      );
    }
    if (doctor) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) =>
          record.doctor.name.includes(doctor) ||
          record.doctor.lastName.includes(doctor)
      );
    }
    if (categoryId) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) => record.category.id === categoryId
      );
    }
    if (date_from) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) => new Date(record.date) >= new Date(date_from)
      );
    }
    if (date_to) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) => new Date(record.date) <= new Date(date_to)
      );
    }
  }
  clearFilters() {
    this.tableFilters = {};
    this.filter();
  }

  save(): void {
    localStorage.setItem('medicalRecords', JSON.stringify(this.allRecords));
  }


  @ViewChild('tableData', { static: false }) table: ElementRef | null = null;
 
  exportToExcel() {
    if (this.table) {
      const tableElement: HTMLTableElement = this.table.nativeElement;
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'registros_medicos.xlsx');
    } else {
      // Manejar el caso en el que this.table es nulo
      console.error("this.table es nulo");
    }
  }

  exportToPDF() {
    if (this.table) {
      const tableElement: HTMLTableElement = this.table.nativeElement;
      const doc = new jsPDF();
      
      // Generar la tabla en el PDF utilizando jsPDF-AutoTable
      // @ts-ignore
      doc.autoTable({ html: tableElement });

      // Guardar el PDF con un nombre de archivo
      doc.save('registros_medicos.pdf');
    } else {
      // Manejar el caso en el que this.table es nulo
      console.error("this.table es nulo");
    }
  }

}
