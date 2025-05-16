import { Ciudad } from "./ciudad";

export interface Estadio {
    id: number;
    nombre: string;
    idCiudad: number;
    ciudad: Ciudad;
    capacidad: number;
}