import { Component, OnInit } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../shared/entidades/seleccion';
import { SeleccionService } from '../../../core/servicios/seleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionEditarComponent } from '../seleccion-editar/seleccion-editar.component';

@Component({
  selector: 'app-seleccion',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgFor,
    NgxDatatableModule
  ],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent implements OnInit {

  public opcionBusqueda: number = -1;
  public textoBusqueda: string = "";
  public opcionesBusqueda: string[] = ["Nombre", "Entidad regente"];

  public selecciones: Seleccion[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Entidad Regente", prop: "entidad" }
  ];
  public modoColumna = ColumnMode;

  constructor(private servicioSeleccion: SeleccionService,
    private dialogService: MatDialog
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
    }
    );
  }

  public buscar() {
    if (this.textoBusqueda.length == 0) {
      this.listar();
    }
    else {
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
  }

  public agregar() {
    const ventanaModal = this.dialogService.open(SeleccionEditarComponent,
      {
        width: "500px",
        height: "300px",
        data: {
          encabezado: "Agregando nueva Selección de Fútbol",
          seleccion: {
            id: 0,
            nombre: "",
            entidad: ""
          }
        },
        disableClose: true
      });

    ventanaModal.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.servicioSeleccion.agregar(datos.seleccion).subscribe(
            {
              next: response => {
                this.listar();
              }
              ,
              error: error => {
                window.alert(error.message);
              }
            }
          );
        }
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }



}
