import { AfterViewInit, Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormActaComponent } from './form-acta/form-acta.component';
import { Router } from '@angular/router';
import { ActaPartido } from 'src/app/interfaces/ActaPartido';
import { MatTableDataSource } from '@angular/material/table';
import { ActaPartidoService } from 'src/app/service/acta-partido.service';


//declare var window: any

@Component({
  selector: 'app-actas-partido',
  templateUrl: './actas-partido.component.html',
  styleUrls: ['./actas-partido.component.css']
})
export class ActasPartidoComponent implements OnInit {

  formularioModal: any
  nav: any

  dataModified: any

  actasPartido!: MatTableDataSource<ActaPartido>;
  //actasPartido = new MatTableDataSource<any>(ACTA_PARTIDO);

  constructor(private dialog: MatDialog, private router: Router, private actaService: ActaPartidoService) {
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
    this.actaService.getActasPartido().subscribe(
      data => {
        console.log(data);
        this.actasPartido = new MatTableDataSource(data)
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
    this.dialog.open(FormActaComponent, {
      height: 'auto',
      width: "1000px"
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

    this.actaService.getActasPartidoFiltro(texto).subscribe(
      data => {
        console.log(data)
        this.actasPartido = new MatTableDataSource(data)
      },
      response => {
        console.log(response)
      }
    )
  }
}
