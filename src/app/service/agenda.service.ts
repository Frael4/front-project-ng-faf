import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  token: string = "";
  header;

  constructor(private http: HttpClient) {

    this.token = localStorage.getItem('token_usuario')!
    this.header = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": `bearer ${this.token}`
    })
  }

  
  getAgendasPartido(){
    return this.http.get<any>('https://localhost:7145/Agenda/getAgendasPartidos', {headers: this.header});
  }

  getAgendasPartidoFiltro(texto: string){
    return this.http.get<any>(`https://localhost:7145/Agenda/getAgendasPartidos?transaction=CONSULTAR_ALL_AGENDA_PARTIDO&filtro=${texto}`, { headers: this.header});
  }

  saveAgenda(agenda: any) {
    return this.http.post<any>('https://localhost:7145/Agenda/saveAgenda', agenda, { headers: this.header})
  }

  /* updateAgenda(agenda: any) {
    return this.http.put<any>('https://localhost:7145/Agenda/updateAgenda', agenda, { headers: this.header})
  } */

  deleteAgenda(id: number) {
    return this.http.delete<any>(`https://localhost:7145/Agenda/DeleteAgenda?id=${id}`, { headers: this.header})
  }

}
