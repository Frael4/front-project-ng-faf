import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EliminarDialogComponent } from 'src/app/utils/eliminar-dialog/eliminar-dialog.component';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FormAgendaComponent } from '../form-agenda/form-agenda.component';

@Component({
  selector: 'app-tabla-agenda',
  templateUrl: './tabla-agenda.component.html',
  styleUrls: ['./tabla-agenda.component.css']
})
export class TablaAgendaComponent implements AfterViewInit, OnChanges {

  columnasAgenda: any = ['#', 'Fecha Emision', 'Hora Inicio', 'Lugar', 'Equipo Local',  'Equipo Rival', 'Eliminar']
  @Input() agendaPartidoSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {
    this.agendaPartidoSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.agendaPartidoSource) {
      this.agendaPartidoSource.paginator = this.paginator;
      //this.paginator; // Reinicia el paginator
    }
  }

  ngAfterViewInit(): void {
    console.log(this.agendaPartidoSource)
    this.agendaPartidoSource.paginator = this.paginator;
    console.log(this.agendaPartidoSource.paginator)
  }

  /* Eliminacion de elemento */
  handleDeleteActa(element: any) {
    this.dialog.open(EliminarDialogComponent, {
      data: {
        from: 'agenda',
        element},
      width: '500px',
    });
  }

  /* Edicion de elemento */
  handleEdit(row: any) {
    this.dialog.open(FormAgendaComponent, {
      data: row,
      width: '600px'
    });
  }

}
