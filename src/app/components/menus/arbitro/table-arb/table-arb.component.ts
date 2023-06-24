import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
export class TableArbComponent {
  arbitroSource: any = [{
    cedula: 597978932439,
    nombre: 'Juan',
    apellido: 'Diaz',
    fechanac: '2023/06/21',
    direccion: 'pueblo viejo',
    telefono: 597978932439,
    correo: 'juan@gmail.com',
  },
  {
    cedula: 597978932439,
    nombre: 'Juan',
    apellido: 'Diaz',
    fechanac: '2023/06/21',
    direccion: 'pueblo viejo',
    telefono: 597978932439,
    correo: 'juan@gmail.com',
  },
  {
    cedula: 597978932439,
    nombre: 'Juan',
    apellido: 'Diaz',
    fechanac: '2023/06/21',
    direccion: 'pueblo viejo',
    telefono: 597978932439,
    correo: 'juan@gmail.com',
  },
  {
    cedula: 597978932439,
    nombre: 'Juan',
    apellido: 'Diaz',
    fechanac: '2023/06/21',
    direccion: 'pueblo viejo',
    telefono: 597978932439,
    correo: 'juan@gmail.com',
  },
  {
    cedula: 597978932439,
    nombre: 'Juan',
    apellido: 'Diaz',
    fechanac: '2023/06/21',
    direccion: 'pueblo viejo',
    telefono: 597978932439,
    correo: 'juan@gmail.com',
  },
]

  dataSourceCopy: any = [... this.arbitroSource]
  columnasarbitro: any = ['Cedula', 'Nombre', 'Apellido', 'Fecha de nacimiento', 'Direccion', 'Telefono', 'Correo', 'Editar', 'Eliminar']

  nav: any;
  dataEdit: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router){
    this.nav = this.router.getCurrentNavigation();
    this.dataEdit = this.nav?.extras.state;
    

    if (this.dataEdit != null) {

      if (this.dataEdit?.editUser?.queryParams !== undefined) {
        console.log('Datos obtenidos de edicion')
        console.log(this.dataEdit.editUser.queryParams)

        for (let e of this.arbitroSource) {
          if (e.cedula === this.dataEdit.editUser.queryParams.cedula) {
            e.cedula = this.dataEdit.editUser.queryParams.cedula;
            e.nombre = this.dataEdit.editUser.queryParams.nombre;
            e.apellido = this.dataEdit.editUser.queryParams.apellido;
            e.fechanac = this.dataEdit.editUser.queryParams.fechanac;
            e.direccion = this.dataEdit.editUser.queryParams.direccion;
            e.telefono = this.dataEdit.editUser.queryParams.telefono;
            e.correo = this.dataEdit.editUser.queryParams.correo;


           
          }
        }
      }
      if (this.dataEdit?.deleteUser?.queryParams !== undefined) {
        console.log('usuario a eliminar')
        console.log(this.dataEdit?.deleteUser.queryParams.usuario)
        const res = this.arbitroSource.filter((n: any) => n.name !== this.dataEdit.deleteUser.queryParams.usuario.name )
        this.arbitroSource = [...res]
        this.dataSourceCopy = [...this.arbitroSource]
        /* this.dataEdit.deleteUser.queryParams = undefined */
      }
    }

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



