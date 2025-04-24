import { Component, OnInit } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modules/referencias-material.module';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../shared/entidades/Seleccion';
import { SeleccionService } from '../../../core/servicios/seleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionEditarComponent } from '../seleccion-editar/seleccion-editar.component';

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
export class SeleccionComponent implements OnInit {

  public opcionBusqueda: number = -1;
  public opcionesBusqueda: string[] = ["Nombre", "Entidad"];
  public textoBusqueda: string = "";

  public selecciones: Seleccion[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Entidad Regente", prop: "entidad" }
  ];
  public modoColumna = ColumnMode;

  constructor(private servicioSeleccion: SeleccionService,
    private servicioDialogo: MatDialog,
  ) {

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
    if (this.textoBusqueda.length > 0) {
      this.servicioSeleccion.buscar(this.opcionBusqueda, this.textoBusqueda).subscribe(
        {
          next: response => {
            this.selecciones = response;
          },
          error: error => {
            window.alert(error.message);
          }
        }
      );
    }
    else {
      this.listar();
    }
  }

  public agregar() {
    const dialogo = this.servicioDialogo.open(SeleccionEditarComponent, {
      width: "500px",
      height: "300px",
      data: {
        encabezado: "Agregando una nueva Selección",
        seleccion: {
          id: 0,
          nombre: "",
          entidad: ""
        }
      },
      disableClose: true,
    });
    dialogo.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.servicioSeleccion.agregar(datos.seleccion).subscribe({
            next: response => {
              this.listar();
            },
            error: error => {
              window.alert(error.message);
            }
          });
        }
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }



}
