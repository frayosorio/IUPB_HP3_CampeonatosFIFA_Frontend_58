import { Grupo } from "./grupo";
import { Seleccion } from "./seleccion";

export interface GrupoPais {
    idGrupo: number;
    grupo: Grupo| null;
    idSeleccion: number;
    seleccion: Seleccion| null;
}