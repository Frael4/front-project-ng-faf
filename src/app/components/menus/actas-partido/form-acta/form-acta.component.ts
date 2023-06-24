import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router'
import { HomeComponent } from 'src/app/components/home/home.component';
import { ActaPartido } from 'src/app/interfaces/ActaPartido';
import { ActasPartidoComponent } from '../actas-partido.component';

@Component({
  selector: 'app-form-acta',
  templateUrl: './form-acta.component.html',
  styleUrls: ['./form-acta.component.css']
})
export class FormActaComponent {

  title: string = ''
  actaPartido: any;
  editar = false

  constructor(private router: Router, private dialogRef: MatDialogRef<FormActaComponent>, @Inject(MAT_DIALOG_DATA) private editData: ActaPartido, public snackbar: MatSnackBar) { }

  actaEdit = this.editData

  ngOnInit() {
    console.log(this.actaEdit)
    if (this.actaEdit !== null) {
      this.editar = true
      this.title = 'Editar Acta Partido'

    } else {
      console.log('aqui editar')
      this.editar = false
      this.title = 'Registrar Acta Partido'
    }

    this.actaPartido = new FormGroup({
      id: new FormControl(this.actaEdit?.id || 0),
      fechaEmision: new FormControl(new Date(this.actaEdit?.fechaEmision) || '', Validators.required),
      horaInicio: new FormControl(this.actaEdit?.horaInicio || '', Validators.required),
      horaFin: new FormControl(this.actaEdit?.horaFin || '', Validators.required),
      partido: new FormControl(this.actaEdit?.partido || '', Validators.required),
      golesLocal: new FormControl(this.actaEdit?.golesLocal || ''),
      golesRival: new FormControl(this.actaEdit?.golesRival || ''),
      ganador: new FormControl(this.actaEdit?.ganador || '')
      //totalTarjetasAmarillas: new FormControl(''),
    });
  }

  saveActaPartido() {    
    if (this.actaPartido.status === 'VALID') {
      console.log(this.actaPartido.value)

      let newActa: NavigationExtras = {
        queryParams: {
          data: this.actaPartido.value,
          add: true
        },
        skipLocationChange: false,
        fragment: 'top'
      }

      this.snackbar.open('Acta registrada correctamente', 'Cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      this.redirectTo('/home/actas-partido', newActa)
      this.dialogRef.close()
    }
  }

  editActaPartido() {

    this.snackbar.open( 'Acta guardado correctamente', 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      
    });

    let edit: NavigationExtras = {
      queryParams: {
        data: this.actaPartido.value,
        edita: true
      },
      skipLocationChange: false,
      fragment: 'top'
    };
    this.redirectTo('/home/actas-partido', edit)
    this.dialogRef.close()
    this.editar = false
  }

  redirectTo(uri: string, newActa: NavigationExtras) {
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri], { state: { newActa } }));
  }
}
