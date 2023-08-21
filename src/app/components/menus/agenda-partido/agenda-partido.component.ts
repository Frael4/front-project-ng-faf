import { AfterViewInit, Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ActaPartido } from 'src/app/interfaces/ActaPartido';
import { MatTableDataSource } from '@angular/material/table';

import { FormAgendaComponent } from './form-agenda/form-agenda.component';
import { AgendaService } from 'src/app/service/agenda.service';

@Component({
  selector: 'app-agenda-partido',
  templateUrl: './agenda-partido.component.html',
  styleUrls: ['./agenda-partido.component.css']
})
export class AgendaPartidoComponent implements OnInit {

  formularioModal: any
  nav: any

  dataModified: any

  agendasPartido!: MatTableDataSource<ActaPartido>;
  //actasPartido = new MatTableDataSource<any>(ACTA_PARTIDO);

  constructor(private dialog: MatDialog, private router: Router, private agendaService: AgendaService) {
    this.nav = this.router.getCurrentNavigation();
    this.dataModified = this.nav?.extras.state;
  }

  ngOnInit(): void {
    this.getActaPartido();
  }

  /**
   * Fetch las actas
   */
  getActaPartido() {
    this.agendaService.getAgendasPartido().subscribe(
      data => {
        console.log(data);
        this.agendasPartido = new MatTableDataSource(data)
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
    this.dialog.open(FormAgendaComponent, {
      height: 'auto',
      width: "600px"
    })
  }

  /**
   * Filtra los datos de la tabla
   * 
   * @param $event 
   * @returns 
   */
  handleFiltroActas($event: any) {
    let texto = $event.target.value

    if (texto.trim() == '') {
      this.getActaPartido()
      return
    }

    this.agendaService.getAgendasPartidoFiltro(texto).subscribe(
      data => {
        console.log(data)
        this.agendasPartido = new MatTableDataSource(data)
      },
      response => {
        console.log(response)
      }
    )
  }
  
}
