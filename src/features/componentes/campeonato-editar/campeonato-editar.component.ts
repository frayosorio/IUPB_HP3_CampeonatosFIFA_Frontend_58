import { Component, Inject } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { Campeonato } from '../../../shared/entidades/campeonato';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Seleccion } from '../../../shared/entidades/seleccion';
import { NgFor } from '@angular/common';

export interface DatosEdicionCampeonato {
  encabezado: string;
  campeonato: Campeonato;
  selecciones: Seleccion[];
}

@Component({
  selector: 'app-campeonato-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './campeonato-editar.component.html',
  styleUrl: './campeonato-editar.component.css'
})
export class CampeonatoEditarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionCampeonato,
    private ventanaDialogo: MatDialogRef<CampeonatoEditarComponent>) {

  }

  public cerrar() {
    this.ventanaDialogo.close();
  }
}
