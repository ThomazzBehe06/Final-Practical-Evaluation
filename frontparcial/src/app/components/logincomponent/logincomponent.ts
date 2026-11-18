import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice';
import { LoginResponse } from '../../models/authentication';

@Component({
  selector: 'app-logincomponent',
  standalone: false,
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css'
})
export class Logincomponent {

  vista = 'login';

  usuario = '';
  password = '';
  confirmarPassword = '';

  mensaje = '';
  cargando = false;

  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) {
  }

  cambiarVista(vista: string) {
    this.vista = vista;
    this.mensaje = '';
  }

  mensajeDeError(e: HttpErrorResponse, mensajePorDefecto: string): string {
    if (e.status === 0) {
      return 'No se pudo conectar con el servidor';
    }
    if (e.status === 409) {
      return 'Ese nombre de usuario ya existe';
    }
    if (typeof e.error === 'string' && e.error !== '') {
      return e.error;
    }
    return mensajePorDefecto;
  }

  iniciarSesion() {
    if (this.usuario.trim() === '' || this.password === '') {
      this.mensaje = 'Ingresa tus datos.';
      return;
    }

    this.mensaje = '';
    this.cargando = true;

    this.auth.login({ username: this.usuario.trim(), password: this.password }).subscribe({
      next: (respuesta: LoginResponse) => {
        this.cargando = false;
        this.cdr.markForCheck();
        this.auth.guardarSesion(respuesta);
        this.password = '';
        if (this.auth.obtenerRol() === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/lista']);
        }
      },
      error: (e: HttpErrorResponse) => {
        this.cargando = false;
        if (e.status === 401) {
          this.mensaje = 'Usuario o contraseña incorrectos.';
        } else {
          this.mensaje = this.mensajeDeError(e, 'No se pudo iniciar sesión');
        }
        this.cdr.markForCheck();
      }
    });
  }

  registrarse() {
    if (this.usuario.trim() === '' || this.password === '') {
      this.mensaje = 'Completa todos los campos.';
      return;
    }
    if (this.password !== this.confirmarPassword) {
      this.mensaje = 'Las contraseñas no coinciden.';
      return;
    }

    this.mensaje = '';
    this.cargando = true;

    this.auth.registro({ username: this.usuario.trim(), password: this.password }).subscribe({
      next: () => {
        this.cargando = false;
        this.vista = 'login';
        this.password = '';
        this.confirmarPassword = '';
        this.mensaje = 'Cuenta creada. Ahora inicia sesión.';
        this.cdr.markForCheck();
      },
      error: (e: HttpErrorResponse) => {
        this.cargando = false;
        this.mensaje = this.mensajeDeError(e, 'No se pudo completar el registro');
        this.cdr.markForCheck();
      }
    });
  }
}
