import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice';
import { UserService } from '../../services/userservice';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuarioscomponent',
  standalone: false,
  templateUrl: './usuarioscomponent.html',
  styleUrl: './usuarioscomponent.css'
})
export class Usuarioscomponent implements OnInit {

  usuarios: Usuario[] = [];
  total = 0;
  mensaje = '';
  cargando = false;

  rol = '';
  esAdmin = false;

  nuevoUsername = '';
  nuevoPassword = '';
  nuevoRol = 'USER';

  constructor(private userService: UserService, private auth: AuthService,
              private router: Router, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (!this.auth.estaLogueado()) {
      this.router.navigate(['/login']);
      return;
    }
    this.rol = this.auth.obtenerRol();
    this.esAdmin = this.rol === 'ADMIN';
    this.cargar();
  }

  manejarError(e: HttpErrorResponse, mensajePorDefecto: string) {
    if (e.status === 401) {
      this.auth.cerrarSesion();
      this.router.navigate(['/login']);
      return;
    }
    if (e.status === 0) {
      this.mensaje = 'No se pudo conectar con el servidor';
    } else if (e.status === 403) {
      this.mensaje = 'No tienes permisos para hacer esto';
    } else if (typeof e.error === 'string' && e.error !== '') {
      this.mensaje = e.error;
    } else {
      this.mensaje = mensajePorDefecto;
    }
    this.cdr.markForCheck();
  }

  cargar() {
    this.cargando = true;

    this.userService.listar().subscribe({
      next: (lista: Usuario[]) => {
        this.usuarios = lista;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (e: HttpErrorResponse) => {
        this.cargando = false;
        this.manejarError(e, 'No se pudo cargar la lista de usuarios');
      }
    });

    this.userService.contar().subscribe({
      next: (n: number) => {
        this.total = n;
        this.cdr.markForCheck();
      },
      error: () => {
        this.total = 0;
      }
    });
  }

  crear() {
    if (this.nuevoUsername.trim() === '' || this.nuevoPassword === '') {
      this.mensaje = 'Usuario y contraseña son obligatorios';
      return;
    }

    this.userService.crear({
      username: this.nuevoUsername.trim(),
      password: this.nuevoPassword,
      role: this.nuevoRol
    }).subscribe({
      next: (texto: string) => {
        this.mensaje = texto;
        this.nuevoUsername = '';
        this.nuevoPassword = '';
        this.nuevoRol = 'USER';
        this.cargar();
        this.cdr.markForCheck();
      },
      error: (e: HttpErrorResponse) => {
        this.manejarError(e, 'No se pudo crear el usuario');
      }
    });
  }

  eliminar(u: Usuario) {
    if (!confirm('¿Eliminar al usuario "' + u.username + '"?')) {
      return;
    }

    this.userService.eliminar(u.id).subscribe({
      next: (texto: string) => {
        this.mensaje = texto;
        this.cargar();
        this.cdr.markForCheck();
      },
      error: (e: HttpErrorResponse) => {
        this.manejarError(e, 'No se pudo eliminar el usuario');
      }
    });
  }
}
