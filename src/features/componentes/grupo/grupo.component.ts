import { Component } from '@angular/core';
import { Grupo } from '../../../shared/entidades/grupo';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../shared/entidades/seleccion';
import { Campeonato } from '../../../shared/entidades/campeonato';
import { GrupoPosicionesComponent } from '../grupo-posiciones/grupo-posiciones.component';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';
import { GrupoEditarComponent } from '../grupo-editar/grupo-editar.component';
import { GrupoService } from '../../../core/servicios/grupo.service';
import { CampeonatoService } from '../../../core/servicios/campeonato.service';
import { SeleccionService } from '../../../core/servicios/seleccion.service';
import { EncuentroService } from '../../../core/servicios/encuentro.service';
import { MatDialog } from '@angular/material/dialog';
import { GrupoPaisComponent } from '../grupo-pais/grupo-pais.component';
import { GrupoPais } from '../../../shared/entidades/grupopais';
import { GrupoEncuentroComponent } from '../grupo-encuentro/grupo-encuentro.component';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-grupo',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgFor,
    NgxDatatableModule
  ],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {
public textoBusqueda: string = "";
  public grupos: Grupo[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Paises", prop: "paises" }
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public selecciones: Seleccion[] = [];
  public campeonatos: Campeonato[] = [];
  public campeonatoEscogido: Campeonato | undefined;
  public grupoEscogido: Grupo | undefined;
  public indiceGrupoEscogido: number = -1;

  constructor(private grupoServicio: GrupoService,
    private campeonatoServicio: CampeonatoService,
    private seleccionServicio: SeleccionService,
    private encuentroServicio: EncuentroService,
    public dialogServicio: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.listarCampeonatos();
    this.listarSeleciones();
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.grupoEscogido = event.row;
      this.indiceGrupoEscogido = this.grupos.findIndex(grupo => grupo == this.grupoEscogido);
    }
  }

  public listarCampeonatos() {
    this.campeonatoServicio.listar().subscribe(
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

  public listarSeleciones() {
    this.seleccionServicio.listar().subscribe(
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

  public listarGrupos() {
    if (this.campeonatoEscogido) {
      this.grupoServicio.listarCampeonato(this.campeonatoEscogido.id).subscribe(
        {
          next: response => {
            this.grupos = response;
            // Llamar a listarPaises por cada grupo
            for (let grupo of this.grupos) {
              this.grupoServicio.listarPaises(grupo.id).subscribe({
                next: seleccionesGrupo => {
                  grupo.paises = seleccionesGrupo.map(sg => sg.seleccion!.nombre).join(", ");
                },
                error: error => {
                  console.error(`Error al listar países del grupo ${grupo.id}`, error);
                }
              });
            }
          },
          error: error => {
            window.alert(error);
          }
        }
      );
    }
  }

  agregar() {
    if (this.campeonatoEscogido) {
      const dialogRef = this.dialogServicio.open(GrupoEditarComponent, {
        width: '500px',
        height: '300px',
        data: {
          encabezado: "Agregando un nuevo Grupo",
          grupo: {
            id: 0,
            nombre: "",
            idCampeonato: this.campeonatoEscogido.id,
            campeonato: this.campeonatoEscogido
          },
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            datos.grupo.campeonato = null;
            this.grupoServicio.agregar(datos.grupo).subscribe({
              next: response => {
                this.listarGrupos();
              },
              error: error => {
                window.alert(error);
              }
            });
          }
        },
        error: error => {
          window.alert(error);
        }
      }
      );
    }
    else {
      window.alert("Se debe elegir un Campeonato");
    }
  }
  modificar() {
    if (this.grupoEscogido) {
      const dialogRef = this.dialogServicio.open(GrupoEditarComponent, {
        width: '500px',
        height: '300px',
        data: {
          encabezado: `Editando el Grupo [${this.grupoEscogido.nombre}]`,
          grupo: this.grupoEscogido,
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.grupoServicio.modificar(datos.grupo).subscribe({
              next: response => {
                this.listarGrupos();
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        }
      });
    }
    else {
      window.alert("Se debe elegir un Grupo de la lista");
    }
  }

  verificarEliminar() {
    if (this.grupoEscogido) {
      const dialogRef = this.dialogServicio.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `Está seguro de eliminar el Grupo [${this.grupoEscogido.nombre}]`,
          id: this.grupoEscogido.id
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.grupoServicio.eliminar(datos.id).subscribe({
              next: response => {
                if (response) {
                  this.listarGrupos();
                  window.alert("El Grupo fue eliminado");
                }
                else {
                  window.alert("No se pudo eliminar el Grupo");
                }
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        }
      });
    }
    else {
      window.alert("Se debe elegir un Grupo de la lista");
    }
  }

  posiciones() {
    if (this.grupoEscogido) {
      this.grupoServicio.listarTablaPosiciones(this.grupoEscogido.id).subscribe({
        next: response => {
          const dialogRef = this.dialogServicio.open(GrupoPosicionesComponent, {
            width: "600px",
            height: "400px",
            data: {
              encabezado: `Tabla de Posiciones del Grupo [${this.grupoEscogido!.nombre}]`,
              posiciones: response
            },
            disableClose: true,
          });
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Se debe elegir un Grupo de la lista");
    }
  }

  seleccionesGrupo(){
    if (this.grupoEscogido) {
      this.grupoServicio.listarPaises(this.grupoEscogido.id).subscribe({
        next: response => {
          const dialogRef = this.dialogServicio.open(GrupoPaisComponent, {
            width: "600px",
            height: "500px",
            data: {
              encabezado: `Selecciones del Grupo [${this.grupoEscogido!.nombre}]`,
              seleccionesGrupo: response,
              selecciones: this.selecciones,
              grupo: this.grupoEscogido,
            },
            disableClose: true,
          });

          dialogRef.afterClosed().subscribe(datos => {
            // Actualiza grupo.paises después de cerrar el diálogo
            this.grupoEscogido!.paises = datos
              .map((sg: GrupoPais) => sg.seleccion!.nombre)
              .join(", ");
          });
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Se debe elegir un Grupo de la lista");
    }
  }

  encuentrosGrupo(){
    if (this.grupoEscogido) {
      this.encuentroServicio.listarGrupo(this.grupoEscogido.id).subscribe({
        next: response => {
          response = response.map(e => ({
            ...e,
            fecha: new Date(e.fecha)
          }));
          const dialogRef = this.dialogServicio.open(GrupoEncuentroComponent, {
            width: "800px",
            height: "400px",
            data: {
              encabezado: `Encuentros del Grupo [${this.grupoEscogido!.nombre}]`,
              encuentros: response
            },
            disableClose: true,
          });
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Se debe elegir un Grupo de la lista");
    }   
  }


}
