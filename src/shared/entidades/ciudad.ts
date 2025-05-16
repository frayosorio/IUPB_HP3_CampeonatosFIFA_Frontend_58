import { Seleccion } from "./seleccion";

export interface Ciudad {
    id: number;
    nombre: string;
    idPais: number;
    pais: Seleccion;
}