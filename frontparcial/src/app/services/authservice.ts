import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, RegistroRequest } from '../models/authentication';

export const API = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(datos: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API + '/auth/login', datos);
  }

  registro(datos: RegistroRequest): Observable<string> {
    return this.http.post(API + '/auth/register', datos, { responseType: 'text' });
  }

  guardarSesion(respuesta: LoginResponse) {
    localStorage.setItem('token', respuesta.token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  estaLogueado(): boolean {
    if (this.obtenerToken() == null) {
      return false;
    }
    if (this.tokenVencido()) {
      this.cerrarSesion();
      return false;
    }
    return true;
  }

  cerrarSesion() {
    localStorage.removeItem('token');
  }

  leerDatosDelToken(): any {
    const token = this.obtenerToken();
    if (token == null) {
      return null;
    }
    try {
      const partes = token.split('.');
      const texto = partes[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(texto));
    } catch (e) {
      return null;
    }
  }

  obtenerRol(): string {
    const datos = this.leerDatosDelToken();
    if (datos == null || !datos.role) {
      return '';
    }
    return datos.role;
  }

  obtenerUsuario(): string {
    const datos = this.leerDatosDelToken();
    if (datos == null || !datos.sub) {
      return '';
    }
    return datos.sub;
  }

  tokenVencido(): boolean {
    const datos = this.leerDatosDelToken();
    if (datos == null || datos.exp == null) {
      return false;
    }
    return datos.exp * 1000 < Date.now();
  }
}
