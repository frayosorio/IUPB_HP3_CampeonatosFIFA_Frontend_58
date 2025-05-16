import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { Encuentro } from '../../../shared/entidades/encuentro';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { CommonModule } from '@angular/common';

export interface DatosEncuentros {
  encabezado: string;
  encuentros: Encuentro[];
}

@Component({
  selector: 'app-grupo-encuentro',
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    CommonModule
  ],
  templateUrl: './grupo-encuentro.component.html',
  styleUrl: './grupo-encuentro.component.css'
})
export class GrupoEncuentroComponent {
 @ViewChild('fechaTemplate', { static: true }) fechaTemplate!: TemplateRef<any>;

  public columnas: any[] = [];
  public modoColumna = ColumnMode;

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEncuentros,
    public dialogRef: MatDialogRef<GrupoEncuentroComponent>,
  ) {
  }

  ngOnInit(): void {
    this.columnas = [
      { name: "Fecha", prop: "fecha", width: 100, cellTemplate: this.fechaTemplate },
      { name: "Seleccion 1", prop: "pais1.nombre", width: 150 },
      { name: "Goles", prop: "goles1", width: 50 },
      { name: "Seleccion 2", prop: "pais2.nombre", width: 150 },
      { name: "Goles", prop: "goles2", width: 50 },
      { name: "Estadio", prop: "estadio.nombre", width: 150 },
      { name: "Ciudad", prop: "estadio.ciudad.nombre", width: 150 },
    ];
  }

  cerrar() {
    this.dialogRef.close();
  }
}
