import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'app-navbarcomponent',
  standalone: false,
  styleUrl: './navbarcomponent.css',
  templateUrl: './navbarcomponent.html',
})
export class Navbarcomponent implements OnInit {

  logueado = false;
  usuario = '';
  rol = '';

  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.actualizar();
    this.router.events.subscribe((evento) => {
      if (evento instanceof NavigationEnd) {
        this.actualizar();
      }
    });
  }

  actualizar() {
    this.logueado = this.auth.estaLogueado();
    this.usuario = this.auth.obtenerUsuario();
    this.rol = this.auth.obtenerRol();
    this.cdr.markForCheck();
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
    this.actualizar();
    this.router.navigate(['/login']);
  }
}
