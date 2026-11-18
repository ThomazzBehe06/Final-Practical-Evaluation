import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API, AuthService } from './authservice';
import { Usuario, NuevoUsuario } from '../models/usuario';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  private headers(): HttpHeaders {
    const token = this.auth.obtenerToken();
    if (token != null) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    }
    return new HttpHeaders();
  }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(API + '/user/getall', { headers: this.headers() });
  }

  contar(): Observable<number> {
    return this.http.get<number>(API + '/user/count', { headers: this.headers() });
  }

  crear(datos: NuevoUsuario): Observable<string> {
    return this.http.post(API + '/user/createjson', datos, {
      headers: this.headers(),
      responseType: 'text',
    });
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete(API + '/user/deletebyid/' + id, {
      headers: this.headers(),
      responseType: 'text',
    });
  }
}
