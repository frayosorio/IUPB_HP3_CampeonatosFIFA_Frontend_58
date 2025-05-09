import { Component, OnInit, ViewChild } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule, NgControlStatusGroup } from '@angular/forms';
import { ColumnMode, DatatableComponent, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Campeonato } from '../../../shared/entidades/campeonato';
import { CampeonatoService } from '../../../core/servicios/campeonato.service';
import { MatDialog } from '@angular/material/dialog';
import { CampeonatoEditarComponent } from '../campeonato-editar/campeonato-editar.component';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-campeonato',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule,
    NgFor
  ],
  templateUrl: './campeonato.component.html',
  styleUrl: './campeonato.component.css'
})
export class CampeonatoComponent implements OnInit {
  @ViewChild(DatatableComponent) tabla!: DatatableComponent;
  public readonly TAMANO: number = 10;

  public opcionBusqueda: number = -1;
  public textoBusqueda: string = "";
  public opcionesBusqueda: string[] = ["Nombre", "Año", "País Organizador"];

  public campeonatos: Campeonato[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Año", prop: "año" },
    { name: "País Organizador", prop: "paisOrganizador.nombre" },
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public campeonatoEscogido: Campeonato | undefined;
  public indiceCampeonatoEscogido: number = -1;

  constructor(private servicioCampeonato: CampeonatoService,
    private dialogService: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.listar(-1);
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.campeonatoEscogido = event.row;
      this.indiceCampeonatoEscogido = this.campeonatos.findIndex(campeonato => campeonato == this.campeonatoEscogido);
    }
  }


  public listar(idCampeonatoado: number) {
    this.servicioCampeonato.listar().subscribe({
      next: response => {
        this.campeonatos = response;
        if (idCampeonatoado >= 0) {
          this.indiceCampeonatoEscogido = this.campeonatos.findIndex(campeonato => campeonato.id == idCampeonatoado);
          this.campeonatoEscogido = this.campeonatos[this.indiceCampeonatoEscogido];
          setTimeout(() => {
            this.tabla.offset = Math.floor(this.indiceCampeonatoEscogido / this.TAMANO);
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
      this.servicioCampeonato.buscar(this.opcionBusqueda, this.textoBusqueda).subscribe(
        {
          next: response => {
            this.campeonatos = response;
          },
          error: error => {
            window.alert(error.message);
          }
        }
      );
    }
  }

  public agregar() {
    const ventanaModal = this.dialogService.open(CampeonatoEditarComponent,
      {
        width: "500px",
        height: "300px",
        data: {
          encabezado: "Agregando nuevo Campeonato Mundial de Fútbol",
          campeonato: {
            id: 0,
            nombre: "",
            año: 0,
            year: 0,
            idSeleccion: 0,
            paisOrganizador: {
              id: 0,
              nombre: "",
              entidad: ""
            }
          }
        },
        disableClose: true
      });

    ventanaModal.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          datos.campeonato.año = datos.campeonato.year;
          this.servicioCampeonato.agregar(datos.campeonato).subscribe(
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

  public modificar() {
    if (this.campeonatoEscogido) {
      this.campeonatoEscogido.year = this.campeonatoEscogido.año;
      const ventanaModal = this.dialogService.open(CampeonatoEditarComponent,
        {
          width: "500px",
          height: "300px",
          data: {
            encabezado: `Editando el Campeonato ${this.campeonatoEscogido.nombre}`,
            campeonato: this.campeonatoEscogido
          },
          disableClose: true
        });
      ventanaModal.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            datos.campeonato.año = datos.campeonato.year;
            this.servicioCampeonato.modificar(datos.campeonato).subscribe(
              {
                next: response => {
                  this.campeonatos[this.indiceCampeonatoEscogido] = response;
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
    else {
      window.alert("Debe escoger alguna de las campeonatos listadas");
    }
  }

  verificarEliminar() {
    if (this.campeonatoEscogido) {
      const ventanaModal = this.dialogService.open(DecidirComponent,
        {
          width: "400px",
          height: "200px",
          data: {
            encabezado: `Está seguro de eliminar el Campeonato ${this.campeonatoEscogido.nombre}?`,
            id: this.campeonatoEscogido.id
          },
          disableClose: true
        });

      ventanaModal.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.servicioCampeonato.eliminar(datos.id).subscribe({
              next: response => {
                if (response) {
                  this.listar(-1);
                }
                else {
                  window.alert("No se puede eliminar el Campeonato");
                }
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
    else {
      window.alert("Debe escoger alguna de los campeonatos listados");
    }
  }

}
