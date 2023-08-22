import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { ArbitroComponent } from '../arbitro.component';
import { ArbitroService } from 'src/app/service/arbitro.service';

@Component({
  selector: 'app-form-arb',
  templateUrl: './form-arb.component.html',
  styleUrls: ['./form-arb.component.css']
})
export class FormArbComponent {

  title: String = ''
  registroArb: any;
  constructor(private router: Router, private dialogRef: MatDialogRef<FormArbComponent>, @Inject(MAT_DIALOG_DATA) private editData: ArbitroComponent, public snackbar: MatSnackBar,
    private arbitroService: ArbitroService) { }

  ngOnInit() {
    this.registroArb = new FormGroup({
      categoria: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      usuario: new FormControl(''),
      contrasenia: new FormControl(''),
      edad: new FormControl(''),
      correo: new FormControl(''),
      nacionalidad: new FormControl(''),
      cantPartidos: new FormControl('')
    });
  }

  saveRegistroArbi() {
    if (this.registroArb.status === 'VALID') {
      console.log(this.registroArb.value)


      let obj = {
        categoria: this.registroArb.value.categoria,
        nombre: this.registroArb.value.nombre,
        apellido: this.registroArb.value.apellido,
        nombreUsuario: this.registroArb.value.usuario,
        contrasenia: this.registroArb.value.contrasenia,
        edad: this.registroArb.value.edad,
        email: this.registroArb.value.correo,
        nacionalidad: this.registroArb.value.nacionalidad,
        cantidadPartidos: this.registroArb.value.cantPartidos
      }

      console.log(obj)
      this.arbitroService.saveArbitro(obj).subscribe(
        data => {
          console.log(data)
          /* if (data.error == 'OK') { */
            this.redirectTo('/home/arbitro')
            this.showSnackBar(data)
            this.dialogRef.close()
          /* } */
        },
        response => {
          console.log(response)
        }
      )
    }

  }

  showSnackBar(data: any) {
    this.snackbar.open(data, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
