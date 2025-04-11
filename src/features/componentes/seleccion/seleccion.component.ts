import { Component, OnInit } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modules/referencias-material.module';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../shared/entidades/Seleccion';
import { SeleccionService } from '../../../core/servicios/seleccion.service';

@Component({
  selector: 'app-seleccion',
  imports: [
    ReferenciasMaterialModule,
    NgFor,
    FormsModule,
    NgxDatatableModule,
  ],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent implements OnInit{

  public opcionBusqueda: number = -1;
  public opcionesBusqueda: string[] = ["Nombre", "Entidad"];
  public textoBusqueda: string = "";

  public selecciones: Seleccion[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Entidad Regente", prop: "entidad" }
  ];
  public modoColumna = ColumnMode;

  constructor(private servicioSeleccion: SeleccionService) {
    
   }

   ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.servicioSeleccion.listar().subscribe({
      next: response => {
        this.selecciones = response;
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  public buscar() {

  }
}
