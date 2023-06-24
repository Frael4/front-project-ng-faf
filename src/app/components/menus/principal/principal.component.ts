import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  menusCard: any = [
    {
      title: 'Acta Partido',
      path: '/home/actas-partido',
      src: '../../../assets/img/acta-partido.png'
    },
    {
      title: 'Arbitros',
      path: '/home/arbitro',
      src: '../../../assets/img/arbitro.png'
    },
    {
      title: 'Clubes/Equipos',
      path: '',
      src: '../../../assets/img/working.png'
    },
    {
      title: 'Calendarios',
      path: '',
      src: '../../../assets/img/working.png'
    },
    {
      title: 'Registrar Asistencias',
      path: '',
      src: '../../../assets/img/working.png'
    },
    {
      title: 'Marcar Asistencia',
      path: '',
      src: '../../../assets/img/working.png'
    }
  ]

}
