import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormArbComponent } from './form-arb/form-arb.component';
import { Router } from '@angular/router';

let arbitroSource = [{
  cedula: 1970978932439,
  nombre: 'Luis',
  apellido: 'Hojas',
  fechanac: '2023/09/31',
  direccion: 'pueblo viejo',
  telefono: 597978932439,
  correo: 'luis@gmail.com',
},
{
  cedula: 2970956783343,
  nombre: 'David',
  apellido: 'Sánchez',
  fechanac: '2023/04/22',
  direccion: 'pueblo viejo',
  telefono: 597978932439,
  correo: 'david@gmail.com',
},
{
  cedula: 3970986657231,
  nombre: 'Juan',
  apellido: 'Diaz',
  fechanac: '2023/06/21',
  direccion: 'pueblo viejo',
  telefono: 597978932439,
  correo: 'juan@gmail.com',
},
{
  cedula: 4970923164845,
  nombre: 'Holger',
  apellido: 'García',
  fechanac: '2023/08/12',
  direccion: 'pueblo viejo',
  telefono: 597978932439,
  correo: 'holger@gmail.com',
},
{
  cedula: 5970985656439,
  nombre: 'Carlos',
  apellido: 'Saavedra',
  fechanac: '2023/01/27',
  direccion: 'pueblo viejo',
  telefono: 597978932439,
  correo: 'carlos@gmail.com',
},

{
  cedula: 6970912127538,
  nombre: 'Jairo',
  apellido: 'Baque',
  fechanac: '2023/02/01',
  direccion: 'pueblo viejo',
  telefono: 597978932439,
  correo: 'jairo@gmail.com',
},
]


@Component({
  selector: 'app-arbitro',
  templateUrl: './arbitro.component.html',
  styleUrls: ['./arbitro.component.css']
})
export class ArbitroComponent {

  dataSourceCopy: any = [... arbitroSource]
  nav: any;
  dataEdit: any;


  ngOnInit(): void{
    /* this.formularioModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    ) */
  }

  constructor(
    private dialog: MatDialog, private router: Router
  ){
    this.nav = this.router.getCurrentNavigation();
    this.dataEdit = this.nav?.extras.state;

    if (this.dataEdit != null) {

      if (this.dataEdit.newArbi?.queryParams !== undefined) {
        console.log('Datos agregados')
        
        const tmp = this.dataEdit?.newArbi?.queryParams.data
        console.log(tmp)
       /*  console.log(nuevaActa) */
        /* nuevaActa['id'] = (this.dataSourceCopy.data.length + 1 ) */
        arbitroSource.push(tmp);
        this.dataSourceCopy.push(tmp)
      }

      if (this.dataEdit?.editUser?.queryParams !== undefined) {
        console.log('Datos obtenidos de edicion')
        console.log(this.dataEdit.editUser.queryParams)
        /* 
        console.log(this.dataSourceCopy) */
        for (let e of this.dataSourceCopy) {
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
        const res = arbitroSource.filter((n: any) => n.cedula !== this.dataEdit.deleteUser.queryParams.usuario.cedula)
        arbitroSource = [...res]
        this.dataSourceCopy = [...arbitroSource]
      }
    }
  }
  showFormularioCrear(){
    console.log('muestra formulario')
    this.dialog.open(FormArbComponent, {
      height: 'auto'
    })
    /* this.formularioModal.show() */

  }

  handleFiltroArb($event: any){
    let texto = $event.target.value
    texto = texto.toLowerCase()

    if(texto === ''){
      this.dataSourceCopy = [...arbitroSource]
      return
    }

    const res = this.dataSourceCopy.filter( (_n: any) => {
      console.log(_n)


      const partido = _n.apellido.toLowerCase();
      const ganador = _n.correo.toLowerCase();

      return ( partido.indexOf(texto) > -1  || ganador.indexOf(texto) > -1)
    })

    this.dataSourceCopy = [...res]

  }
}
