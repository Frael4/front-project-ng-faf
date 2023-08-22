import { AfterViewInit, Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
//import { MatTableDataSource } from '@angular/material/table';

import { FormArbComponent } from './form-arb/form-arb.component';
import { ArbitroService } from 'src/app/service/arbitro.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-arbitro',
  templateUrl: './arbitro.component.html',
  styleUrls: ['./arbitro.component.css']
})
export class ArbitroComponent {

  formularioModal: any
  nav: any

  dataModified: any

  arbitros!: MatTableDataSource<any>;


  ngOnInit(): void {
    /* this.formularioModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    ) */
    this.loadArbitros()
  }

  constructor(
    private dialog: MatDialog, private router: Router,
    private arbitroService: ArbitroService
  ) {

  }

  /**
   * Fetch las arbitros
   */
  loadArbitros() {
    this.arbitroService.getArbitros().subscribe(
      data => {
        console.log(data);
        this.arbitros = new MatTableDataSource(data)
      },
      response => {
        console.log(response)
      }
    )
  }

  showFormularioCrear() {
    console.log('muestra formulario')
    this.dialog.open(FormArbComponent, {
      height: 'auto',
      width: "800px"
    })
    /* this.formularioModal.show() */

  }

  handleFiltroArb($event: any) {
    

  }
}
