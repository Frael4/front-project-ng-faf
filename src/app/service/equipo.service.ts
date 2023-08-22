import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  token: string = "";
  header;

  constructor(private http: HttpClient) {

    this.token = localStorage.getItem('token_usuario')!
    this.header = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": `bearer ${this.token}`
    })
  }

  getEquipos() {
    return this.http.get<any>('http://localhost:7145/Equipo/GetEquipos', { headers: this.header})
  }

  getEquiposFiltro(filtro: string) {
    return this.http.get<any>(`http://localhost:7145/Equipo/GetEquipos?transaction=CONSULTAR_ALL_EQUIPOS&filtro=${filtro}`, 
    {headers: this.header})
  }

  saveEquipo(equipo: any) {
    return this.http.post<any>('http://localhost:7145/Equipo/saveEquipo', equipo, { headers: this.header})
  }

  updateEquipo(equipo: any) {
    return this.http.put<any>('http://localhost:7145/Equipo/updateEquipo', equipo, { headers: this.header})
  }

  deleteEquipo(id: number) {
    return this.http.delete<any>(`http://localhost:7145/Equipo/DeleteEquipo?id=${id}`, { headers: this.header})
  }
}
