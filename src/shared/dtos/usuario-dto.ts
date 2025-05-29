import { Usuario } from "../entidades/usuario";

export interface UsuarioDto  {
    token: string;
    usuario: Usuario;
}