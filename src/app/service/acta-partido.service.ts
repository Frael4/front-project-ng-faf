import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActaPartido } from '../interfaces/ActaPartido';

@Injectable({
  providedIn: 'root'
})
export class ActaPartidoService {

  token: string = "";
  header;

  constructor(private http: HttpClient) {

    this.token = localStorage.getItem('token_usuario')!
    this.header = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": `bearer ${this.token}`
    })
  }

  getActasPartido() {
    return this.http.get<ActaPartido[]>('https://localhost:7145/ActaPartido', { headers: this.header })
  }

  getComboPartidos() {
    return this.http.get<ActaPartido[]>('https://localhost:7145/ActaPartido/getComboPartidos')
  }

  getComboPartidosConActa() {
    return this.http.get<ActaPartido[]>('https://localhost:7145/ActaPartido/getComboPartidosConActas')
  }

  saveActaPartido(acta: any) {
    return this.http.post<any>('https://localhost:7145/ActaPartido/', acta, { headers: this.header })
  }

  deleteActaPartido(id: number) {
    return this.http.delete<any>(`https://localhost:7145/ActaPartido?id=${id}`, { headers: this.header })
  }

  updateActaPartido(acta: any) {
    return this.http.put<any>(`https://localhost:7145/ActaPartido`, acta, { headers: this.header })
  }

  getActasPartidoFiltro(filtro: string) {
    return this.http.get<ActaPartido[]>(`https://localhost:7145/ActaPartido?transaccion=CONSULTAR_ALL_ACTAS_PARTIDO&filtro=${filtro}`, { headers: this.header })
  }
}
