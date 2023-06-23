import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EliminarDialogComponent } from 'src/app/utils/eliminar-dialog/eliminar-dialog.component';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActaPartido } from 'src/app/interfaces/ActaPartido';
import { FormActaComponent } from '../form-acta/form-acta.component';

@Component({
  selector: 'app-table-acta',
  templateUrl: './table-acta.component.html',
  styleUrls: ['./table-acta.component.css']
})
export class TableActaComponent implements AfterViewInit{

  columnasActaPartido: any = ['#', 'Fecha Emision', 'Hora Inicio', 'Hora Fin', 'Partido', 'Goles Local', 'Goles Rival', 'Ganador', 'Editar', 'Eliminar']
  @Input() actaPartidoSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {
    
  }

  ngAfterViewInit(): void {
    this.actaPartidoSource.paginator = this.paginator;
    /* console.log(this.actaPartidoSource.paginator) */
  }

  /* Eliminacion de elemento */
  handleDeleteActa(element: any) {
    this.dialog.open(EliminarDialogComponent, {
      data: element,
      width: '500px'
    });
  }

  /* Edicion de elemento */
  handleEdit(row: any) {

    this.dialog.open(FormActaComponent, {
      data: row
    });
  }
}
