import { Campeonato } from "./campeonato";
import { Estadio } from "./estadio";
import { Fase } from "./Fase";
import { Seleccion } from "./seleccion";

export interface Encuentro {
    id: number;
    campeonato: Campeonato;
    idFase: number;
    fase: Fase;
    idPais1: number;
    pais1: Seleccion;
    goles1: number;
    penalties1: number;
    idPais2: number;
    pais2: Seleccion;
    goles2: number;
    penalties2: number;
    idEstadio: number;
    estadio: Estadio;
    fecha: Date;
}