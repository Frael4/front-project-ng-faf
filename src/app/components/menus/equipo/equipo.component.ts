import { AfterViewInit, Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ActaPartido } from 'src/app/interfaces/ActaPartido';
import { MatTableDataSource } from '@angular/material/table';
import { FormEquipoComponent } from './form-equipo/form-equipo.component';
import { EquipoService } from 'src/app/service/equipo.service';


@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent {

  formularioModal: any
  nav: any

  dataModified: any

  equipos!: MatTableDataSource<any>;
  //actasPartido = new MatTableDataSource<any>(ACTA_PARTIDO);

  constructor(private dialog: MatDialog, private router: Router, private equipoService: EquipoService) {
    this.nav = this.router.getCurrentNavigation();
    this.dataModified = this.nav?.extras.state;
  }

  ngOnInit(): void {
    this.loadEquipos();
  }

  /**
   * Fetch las actas
   */
  loadEquipos() {
    this.equipoService.getEquipos().subscribe(
      data => {
        console.log(data);
        this.equipos = new MatTableDataSource(data)
      },
      response => {
        console.log(response.error)
      }
    )
  }

  /**
   * Muestra el formulario para crear
   */
  showFormularioCrear() {
    console.log('muestra formulario')
    this.dialog.open(FormEquipoComponent, {
      height: 'auto',
      width: "500px"
    })
  }

  /**
   * Filtra los datos de la tabla
   * 
   * @param $event 
   * @returns 
   */
  handleFiltroEquipos($event: any) {
    let texto = $event.target.value

    if (texto.trim() == '') {
      this.loadEquipos()
      return
    }

    this.equipoService.getEquiposFiltro(texto).subscribe(
      data => {
        console.log(data)
        this.equipos = new MatTableDataSource(data)
      },
      response => {
        console.log(response)
      }
    )
  }

}
