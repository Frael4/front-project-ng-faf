import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router'
import { AgendaService } from 'src/app/service/agenda.service';
import { EquipoService } from 'src/app/service/equipo.service';

@Component({
  selector: 'app-form-agenda',
  templateUrl: './form-agenda.component.html',
  styleUrls: ['./form-agenda.component.css']
})
export class FormAgendaComponent {
  title: string = ''
  agendaPartido: any;
  editar = false

  equipos!: any;

  constructor(private router: Router, private dialogRef: MatDialogRef<FormAgendaComponent>, @Inject(MAT_DIALOG_DATA) private editData: any,
    public snackbar: MatSnackBar, private agendaService: AgendaService, private equipoService: EquipoService) { }

  agendaEdit = this.editData

  ngOnInit() {

    this.loadCombosEquipos()
    console.log(this.agendaEdit)
    if (this.agendaEdit !== null) {
      this.editar = true
      this.title = 'Editar Agenda Partido'
    } else {
      this.editar = false
      this.title = 'Registrar Agenda Partido'
    }

    this.agendaPartido = new FormGroup({
      id: new FormControl(this.agendaEdit?.id || 0),
      fechaEmision: new FormControl(new Date(this.agendaEdit?.fechaPartido) || '', Validators.required),
      horaPartido: new FormControl(this.agendaEdit?.horaPartido || '', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]),
      lugar: new FormControl(this.agendaEdit?.lugar || ''),
      equipoLocal: new FormControl(this.agendaEdit?.partido?.equipoLocal?.id || 0),
      equipoRival: new FormControl(this.agendaEdit?.partido?.equipoRival?.id || 0),
    });


  }

  /**
   * Cargar Partidos - fetch
   */
  loadCombosEquipos() {
    this.equipoService.getEquipos().subscribe(
      data => {
        console.log(data)
        this.equipos = data;
      },
      response => {
        console.log(response.error)
      }
    )
  }

  /**
   * Guardar Acta
   */
  saveAgenda() {

    if (this.agendaPartido.status === 'VALID') {
      console.log(this.agendaPartido.value)

      let obj = {
        fechaEmision: this.agendaPartido.value.fechaEmision,
        horaPartido: this.agendaPartido.value.horaPartido,
        lugar: this.agendaPartido.value.lugar,
        partido: {
          equipoLocal: {
            id: this.agendaPartido.value.equipoLocal
          },
          equipoRival: {
            id: this.agendaPartido.value.equipoRival
          }
        }
      }

      console.log(obj)

      this.agendaService.saveAgenda(obj).subscribe(
        data => {
          console.log(data.response)
          if (data?.error == 'OK') {
            this.dialogRef.close()
            this.editar = false
            this.redirectTo('/home/agenda-partido')
          }
          this.showSnackBar(data)
        },
        response => {
          console.log(response)
          this.showSnackBar(response)
        }
      )

      
    }
  }

  editAgenda() {

    let obj = {
      horaInicio: this.agendaPartido.value.horaInicio,
      horaFin: this.agendaPartido.value.horaFin,
      numGolEquipoLocal: this.agendaPartido.value.golesLocal,
      numGolEquipoRival: this.agendaPartido.value.golesRival,
      equipoGanador: this.agendaPartido.value.ganador,
    }

    console.log(obj)
    //this.agendaService.updateAgenda(obj)

    this.dialogRef.close()
    this.editar = false
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  showSnackBar(data: any) {
    this.snackbar.open(data.response, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',

    });
  }

}
