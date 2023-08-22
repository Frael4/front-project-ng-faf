import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArbitroService {

  token: string = "";
  header;

  constructor(private http: HttpClient) {

    this.token = localStorage.getItem('token_usuario')!
    this.header = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": `bearer ${this.token}`
    })
  }

  getArbitros() {
    return this.http.get<any>('http://localhost:7145/Arbitro')
  }

  /* getEquiposFiltro(filtro: string) {
    return this.http.get<any>(`https://localhost:7145/Arbitro/GetEquipos?transaction=CONSULTAR_ALL_EQUIPOS&filtro=${filtro}`, 
    {headers: this.header})
  } */

  saveArbitro(arbitro: any) {
    return this.http.post<any>('http://localhost:7145/Arbitro', arbitro)
  }

  updateArbitro(arbitro: any) {
    return this.http.put<any>('http://localhost:7145/Arbitro', arbitro)
  }

  deleteArbitro(id: number) {
    return this.http.delete(`http://localhost:7145/Arbitro?id=${id}`)
  }
}

