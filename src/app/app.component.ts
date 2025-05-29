import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReferenciasMaterialModule } from '../shared/modulos/referencias-material.module';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../features/componentes/login/login.component';
import { UsuarioService } from '../core/servicios/usuario.service';
import { Usuario } from '../shared/entidades/usuario';
import { AutorizacionService } from '../core/servicios/autorizacion.service';

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

  public usuarioActual: Usuario | null = null;

  constructor(private dialogServicio: MatDialog,
    private usuarioServicio: UsuarioService,
    private autorizacionServicio: AutorizacionService
  ) {

  }

  public login() {
    const dialogRef = this.dialogServicio.open(LoginComponent, {
      width: '400px',
      height: '300px',
      data: { usuario: "", clave: "" }
    });

    dialogRef.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.usuarioServicio.iniciarSesion(datos.usuario, datos.clave).subscribe({
            next: response => {
              this.usuarioActual = response.usuario;
              this.autorizacionServicio.guardarToken(response.token);
            },
            error: error => {
              window.alert(error.message);
            }
          })
        }
      },
      error: error => {
        window.alert(error);
      }
    });
  }
}
