import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API, AuthService } from './authservice';
import { Producto } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class Productoservice {

  private url = API + '/producto';

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  private headers(): HttpHeaders {
    const token = this.auth.obtenerToken();
    if (token != null) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    }
    return new HttpHeaders();
  }

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + '/mostrarTodo', { headers: this.headers() });
  }

  crear(p: Producto): Observable<string> {
    return this.http.post(this.url + '/crear', p, { headers: this.headers(), responseType: 'text' });
  }

  actualizar(id: number, p: Producto): Observable<string> {
    return this.http.put(this.url + '/actualizar/' + id, p, { headers: this.headers(), responseType: 'text' });
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete(this.url + '/eliminar/' + id, { headers: this.headers(), responseType: 'text' });
  }
}
