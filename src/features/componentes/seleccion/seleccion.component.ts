import { Component, OnInit, ViewChild } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ColumnMode, DatatableComponent, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
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
  @ViewChild(DatatableComponent) tabla!: DatatableComponent;
  public readonly TAMANO: number = 10;

  public opcionBusqueda: number = -1;
  public textoBusqueda: string = "";
  public opcionesBusqueda: string[] = ["Nombre", "Entidad regente"];

  public selecciones: Seleccion[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Entidad Regente", prop: "entidad" }
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public seleccionEscogida: Seleccion | undefined;
  public indiceSeleccionEscogida: number = -1;

  constructor(private servicioSeleccion: SeleccionService,
    private dialogService: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.listar(-1);
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.seleccionEscogida = event.row;
      this.indiceSeleccionEscogida = this.selecciones.findIndex(seleccion => seleccion == this.seleccionEscogida);
    }
  }


  public listar(idSeleccionado: number) {
    this.servicioSeleccion.listar().subscribe({
      next: response => {
        this.selecciones = response;
        if (idSeleccionado >= 0) {
          this.indiceSeleccionEscogida = this.selecciones.findIndex(seleccion => seleccion.id == idSeleccionado);
          this.seleccionEscogida = this.selecciones[this.indiceSeleccionEscogida];
          setTimeout(() => {
            this.tabla.offset = Math.floor(this.indiceSeleccionEscogida / this.TAMANO);
          });
        }
      },
      error: error => {
        window.alert(error.message);
      }
    }
    );
  }

  public buscar() {
    if (this.textoBusqueda.length == 0) {
      this.listar(-1);
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
                this.listar(response.id);
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
