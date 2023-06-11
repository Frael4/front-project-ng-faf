import { Component } from '@angular/core';

@Component({
  selector: 'app-table-acta',
  templateUrl: './table-acta.component.html',
  styleUrls: ['./table-acta.component.css']
})
export class TableActaComponent {

  actaPartidoSource: any = [{
    id: 1,
    fechaEmision: '2023/01/01',
    horaInicio: '14:50',
    horaFin: '16:50',
    partido: 'Strong vs Beast',
    golesLocal: 5,
    golesRival: 3,
    ganador: 'Strong'
  }]
  columnasActaPartido: any = ['#', 'Fecha Emision', 'Hora Inicio', 'Hora Fin', 'Partido', 'Goles Local', 'Goles Rival', 'Ganador', 'Eliminar']
  constructor(){}
}
