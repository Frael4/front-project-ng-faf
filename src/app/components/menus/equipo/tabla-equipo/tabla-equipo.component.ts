import { Component, Input, ViewChild,  SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EliminarDialogComponent } from 'src/app/utils/eliminar-dialog/eliminar-dialog.component';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FormEquipoComponent } from '../form-equipo/form-equipo.component';

@Component({
  selector: 'app-tabla-equipo',
  templateUrl: './tabla-equipo.component.html',
  styleUrls: ['./tabla-equipo.component.css']
})
export class TablaEquipoComponent {

  columnasEquipos: any = ['#', 'Nombre Equipo', 'Director', 'Editar', 'Eliminar']
  @Input() equiposSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {
    this.equiposSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.equiposSource) {
      this.equiposSource.paginator = this.paginator;
      //this.paginator; // Reinicia el paginator
    }
  }

  ngAfterViewInit(): void {

    this.equiposSource.paginator = this.paginator;
  }

  /* Eliminacion de elemento */
  handleDeleteActa(element: any) {
    this.dialog.open(EliminarDialogComponent, {
      data: {
        from: "equipo",
        element
      },

      width: '500px',
    });
  }

  /* Edicion de elemento */
  handleEdit(row: any) {
    this.dialog.open(FormEquipoComponent, {
      data: row,
      width: '500px'
    });
  }

}
