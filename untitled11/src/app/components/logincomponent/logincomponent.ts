
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logincomponent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css'
})
export class Logincomponent {

  vista = 'login';

  usuario = '';
  correo = '';
  password = '';
  confirmarPassword = '';

  mensaje = '';
  cargando = false;

  private api = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  cambiarVista(vista: string) {
    this.vista = vista;
    this.mensaje = '';
  }

  registrarse() {
    if (!this.usuario || !this.correo || !this.password) {
      this.mensaje = 'Completa todos los campos.';
      return;
    }

    if (this.password !== this.confirmarPassword) {
      this.mensaje = 'Las contraseñas no coinciden.';
      return;
    }

    this.cargando = true;

    this.http.post(`${this.api}/registro`, {
      usuario: this.usuario,
      correo: this.correo,
      password: this.password
    }).subscribe({
      next: () => {
        this.cargando = false;
        this.mensaje = 'Cuenta creada. Ahora inicia sesión.';
        this.vista = 'login';
        this.password = '';
        this.confirmarPassword = '';
      },
      error: () => {
        this.cargando = false;
        this.mensaje = 'No se pudo completar el registro.';
      }
    });
  }

  iniciarSesion() {
    if (!this.correo || !this.password) {
      this.mensaje = 'Ingresa tus datos.';
      return;
    }

    this.cargando = true;

    this.http.post<{ token: string }>(
      `${this.api}/login`,
      {
        correo: this.correo,
        password: this.password
      }
    ).subscribe({
      next: (respuesta) => {
        this.cargando = false;

        if (!respuesta.token) {
          this.mensaje = 'No se recibió una sesión válida.';
          return;
        }

        sessionStorage.setItem('token', respuesta.token);
        this.router.navigate(['/principal']);
      },
      error: () => {
        this.cargando = false;
        this.mensaje = 'Credenciales incorrectas.';
      }
    });
  }
}
