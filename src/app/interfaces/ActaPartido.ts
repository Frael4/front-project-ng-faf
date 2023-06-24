export interface ActaPartido {
    id: number,
    fechaEmision: string,
    horaInicio: string,
    horaFin: string,
    partido: string,
    golesLocal: number,
    golesRival: number,
    ganador: string
}