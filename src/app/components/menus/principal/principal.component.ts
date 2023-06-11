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
      path: '/home/actas-partido'
    },
    {
      title: 'Arbitros',
      path: '/home/arbitro'
    }
  ]

}
