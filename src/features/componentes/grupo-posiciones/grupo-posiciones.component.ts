import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TablaPosicionesDto } from '../../../shared/dtos/posiciones';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';

export interface DatosPosiciones {
  encabezado: string;
  posiciones: TablaPosicionesDto[];
}

@Component({
  selector: 'app-grupo-posiciones',
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule
  ],
  templateUrl: './grupo-posiciones.component.html',
  styleUrl: './grupo-posiciones.component.css'
})
export class GrupoPosicionesComponent {

  public columnas = [
    { name: "Seleccion", prop: "pais" },
    { name: "PJ", prop: "pj" },
    { name: "PG", prop: "pg" },
    { name: "PE", prop: "pe" },
    { name: "PP", prop: "pp" },
    { name: "GF", prop: "gf" },
    { name: "GC", prop: "gc" },
    { name: "Puntos", prop: "puntos" },
  ];
  public modoColumna = ColumnMode;

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosPosiciones,
    public dialogRef: MatDialogRef<GrupoPosicionesComponent>,
  ) {

  }

  cerrar() {
    this.dialogRef.close();
  }
}
