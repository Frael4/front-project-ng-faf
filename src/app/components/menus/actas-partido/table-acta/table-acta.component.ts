import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EliminarDialogComponent } from 'src/app/utils/eliminar-dialog/eliminar-dialog.component';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FormActaComponent } from '../form-acta/form-acta.component';

@Component({
  selector: 'app-table-acta',
  templateUrl: './table-acta.component.html',
  styleUrls: ['./table-acta.component.css']
})
export class TableActaComponent implements AfterViewInit, OnChanges{

  columnasActaPartido: any = ['#', 'Fecha Emision', 'Hora Inicio', 'Hora Fin', 'Partido', 'Goles Local', 'Goles Rival', 'Ganador', 'Editar', 'Eliminar']
  @Input() actaPartidoSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {
    this.actaPartidoSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.actaPartidoSource) {
      this.actaPartidoSource.paginator = this.paginator;
      //this.paginator; // Reinicia el paginator
    }
  }

  ngAfterViewInit(): void {
    console.log(this.actaPartidoSource)
    this.actaPartidoSource.paginator = this.paginator;
    console.log(this.actaPartidoSource.paginator)
  }

  /* Eliminacion de elemento */
  handleDeleteActa(element: any) {
    this.dialog.open(EliminarDialogComponent, {
      data: {
        from: "acta",
        element},
      width: '600px',
    });
  }

  /* Edicion de elemento */
  handleEdit(row: any) {
    this.dialog.open(FormActaComponent, {
      data: row,
      width: '1000px'
    });
  }

}
