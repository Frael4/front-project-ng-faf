import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { ArbitroComponent } from '../arbitro.component';

@Component({
  selector: 'app-form-arb',
  templateUrl: './form-arb.component.html',
  styleUrls: ['./form-arb.component.css']
})
export class FormArbComponent {

  title: String = ''
  registroArb: any;
  constructor(private router: Router, private dialogRef: MatDialogRef<FormArbComponent>, @Inject(MAT_DIALOG_DATA) private editData: ArbitroComponent, public snackbar: MatSnackBar) { }

  ngOnInit() {
    this.registroArb = new FormGroup({
      cedula: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      fechanac: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      
    });
  }

  saveRegistroArbi() {
    if (this.registroArb.status === 'VALID') {
      console.log(this.registroArb.value)

      let newActa: NavigationExtras = {
        queryParams: {
          data: this.registroArb.value,
          add: true
        },
        skipLocationChange: false,
        fragment: 'top'
      }

      this.snackbar.open('Arbitro agregado de forma correcta', 'Cerrar', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      this.redirectTo('/home/arbitro', newActa)
      this.dialogRef.close()
    }
    
  }
  redirectTo(uri: string, newArbi: NavigationExtras) {
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri], { state: { newArbi } }));
  }
}
