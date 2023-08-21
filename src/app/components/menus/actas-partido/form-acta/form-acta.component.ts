import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router'
import { ActaPartido } from 'src/app/interfaces/ActaPartido';
import { ActaPartidoService } from 'src/app/service/acta-partido.service';

@Component({
  selector: 'app-form-acta',
  templateUrl: './form-acta.component.html',
  styleUrls: ['./form-acta.component.css']
})
export class FormActaComponent implements OnInit {

  title: string = ''
  actaPartido: any;
  editar = false

  partidos!: any;

  constructor(private router: Router, private dialogRef: MatDialogRef<FormActaComponent>, @Inject(MAT_DIALOG_DATA) private editData: ActaPartido,
    public snackbar: MatSnackBar, private actaService: ActaPartidoService) { }

  actaEdit = this.editData

  ngOnInit() {

    //console.log(this.actaEdit)
    if (this.actaEdit !== null) {
      this.loadComboPartidosConActa()
      this.editar = true
      this.title = 'Editar Acta Partido'
    } else {
      this.loadComboPartido()
      this.editar = false
      this.title = 'Registrar Acta Partido'
    }

    this.actaPartido = new FormGroup({
      id: new FormControl(this.actaEdit?.id || 0),
      fechaEmision: new FormControl(new Date(this.actaEdit?.fechaEmision) || '', Validators.required),
      horaInicio: new FormControl(this.actaEdit?.horaInicio || '', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]),
      horaFin: new FormControl(this.actaEdit?.horaFin || '', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]), // Patrón para validar el formato de hora (HH:mm)
      partido: new FormControl(this.actaEdit?.idPartido || 0),
      golesLocal: new FormControl(this.actaEdit?.numGolEquipoLocal == 0 ? 0 : this.actaEdit?.numGolEquipoLocal, Validators.pattern('^[0-9]*$')),
      golesRival: new FormControl(this.actaEdit?.numGolEquipoRival == 0 ? 0 : this.actaEdit?.numGolEquipoRival, Validators.pattern('^[0-9]*$')),
      ganador: new FormControl(this.actaEdit?.equipoGanador || '')
      //totalTarjetasAmarillas: new FormControl(''),
    });
    if (this.editar) {
      this.actaPartido.get('fechaEmision')?.disable();
      this.actaPartido.get('partido')?.disable();
    }

  }

  /**
   * Cargar Partidos - fetch
   */
  loadComboPartido() {
    this.actaService.getComboPartidos().subscribe(
      data => {
        console.log(data)
        this.partidos = data;
      },
      response => {
        console.log(response.error)
      }
    )
  }

  loadComboPartidosConActa() {
    this.actaService.getComboPartidosConActa().subscribe(
      data => {
        console.log(data)
        this.partidos = data;
      },
      response => {
        console.log(response.error)
      }
    )
  }

  /**
   * Guardar Acta
   */
  saveActaPartido() {

    if (this.actaPartido.status === 'VALID') {
      let obj = {
        fechaEmision: this.actaPartido.value.fechaEmision,
        horaInicio: this.actaPartido.value.horaInicio,
        horaFin: this.actaPartido.value.horaFin,
        numGolEquipoLocal: Number.parseInt(this.actaPartido.value.golesLocal),
        numGolEquipoRival: Number.parseInt(this.actaPartido.value.golesRival),
        equipoGanador: this.actaPartido.value.ganador,
        partido: {
          id: this.actaPartido.value.partido
        }
      }

      console.log(obj)
      this.actaService.saveActaPartido(obj).subscribe(
        data => {
          console.log(data.response)
          if (data?.error == 'OK') {
            this.dialogRef.close()
            this.editar = false
            this.redirectTo('/home/actas-partido')
          }
          this.showSnackBar(data)
        },
        response => {
          console.log(response)
        }
      )

    }
  }

  editActaPartido() {

    let obj = {
      //id:
      horaInicio: this.actaPartido.value.horaInicio,
      horaFin: this.actaPartido.value.horaFin,
      numGolEquipoLocal: this.actaPartido.value.golesLocal,
      numGolEquipoRival: this.actaPartido.value.golesRival,
      equipoGanador: this.actaPartido.value.ganador,
    }

    console.log(obj)
    this.actaService.updateActaPartido(obj).subscribe(
      data => {
        console.log(data)
        if (data?.error == 'OK') {
          this.dialogRef.close()
          this.editar = false
          this.redirectTo('/home/actas-partido')
        }
        this.showSnackBar(data)
      },
      response => {
        this.showSnackBar(response)
      }
    )

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

  /**
   * Setea al ganador automaticamente - No en uso
   */
  calculateGanador() {
    const golesLocal = this.actaPartido.get('golesLocal')?.value || 0;
    const golesRival = this.actaPartido.get('golesRival')?.value || 0;

    const equipoRival = this.actaPartido.getRawValue().partido //this.actaPartido.get('partido')
    console.log(equipoRival)
    /* if (golesLocal > golesRival) {
      this.actaPartido.get('ganador')?.setValue('Local');
    } else if (golesRival > golesLocal) {
      this.actaPartido.get('ganador')?.setValue();
    } else {
      this.actaPartido.get('ganador')?.setValue('');
    } */
  }
}
