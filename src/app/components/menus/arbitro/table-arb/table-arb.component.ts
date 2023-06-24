import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditarComponent } from '../editar/editar.component';
import { EliminarComponent } from '../eliminar/eliminar.component';



export interface Datos {
  cedula: string,
  nombre: string,
  apellido: string,
  fechanac: string,
  direccion: string,
  telefono: string,
  correo: string

}

@Component({
  selector: 'app-table-arb',
  templateUrl: './table-arb.component.html',
  styleUrls: ['./table-arb.component.css']
})
export class TableArbComponent implements OnInit {


  @Input() dataCopy: any
  dataArbitros: any
  columnasarbitro: any = ['Cedula', 'Nombre', 'Apellido', 'Fecha de nacimiento', 'Direccion', 'Telefono', 'Correo', 'Editar', 'Eliminar']

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {
    /* this.dataArbitros = this.dataCopy; */
    
  }

  ngAfterInit(){
    
  }

  editarElemento(element: any) {
    this.dialog.open(EditarComponent, {
      width: '50%', data: element
    })
  }

  // Exitoso
  eliminarElemento(element: any) {
    console.log('eliminarr .... ');
    this.dialog.open(EliminarComponent, {
      data: element
    });

  }
  ngOnInit() {


  }


}



