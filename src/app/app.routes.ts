import { Routes } from '@angular/router';
import { InicioComponent } from '../features/componentes/inicio/inicio.component';
import { SeleccionComponent } from '../features/componentes/seleccion/seleccion.component';
import { CampeonatoComponent } from '../features/componentes/campeonato/campeonato.component';
import { GrupoComponent } from '../features/componentes/grupo/grupo.component';
import { AutorizacionGuard } from '../core/guardas/autorizacion.guard';


export const RUTA_DEFAULT = '/inicio';

export const routes: Routes = [
    { path: "", redirectTo: "inicio", pathMatch: "full" },
    { path: "inicio", component: InicioComponent },
    { path: "selecciones", component: SeleccionComponent, canActivate: [AutorizacionGuard] },
    { path: "campeonatos", component: CampeonatoComponent, canActivate: [AutorizacionGuard] },
    { path: "grupos", component: GrupoComponent, canActivate: [AutorizacionGuard] }
];
