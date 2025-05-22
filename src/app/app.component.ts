import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReferenciasMaterialModule } from '../shared/modulos/referencias-material.module';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, RouterModule,
    ReferenciasMaterialModule,
    NgFor
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CampeonatosFIFA';

  public opciones = [
    { titulo: "Selecciones", url: "selecciones", icono: "iconos/Seleccion.png" },
    { titulo: "Campeonatos", url: "campeonatos", icono: "iconos/Campeonato.png" },
    { titulo: "Grupos", url: "grupos", icono: "iconos/Grupo.png" }
  ];

}
