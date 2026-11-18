import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice';
import { Productoservice } from '../../services/productoservice';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-admincomponent',
  standalone: false,
  styleUrl: './admincomponent.css',
  templateUrl: './admincomponent.html',
})
export class Admincomponent implements OnInit {

  productos: Producto[] = [];
  mensaje = '';

  id: number | null = null;
  nombreProducto = '';
  tipoProducto: 'FRUTA' | 'VERDURA' = 'FRUTA';
  cantidad = 0;
  precio = 0;
  urlImagen = '';

  constructor(private service: Productoservice, private auth: AuthService,
              private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.auth.estaLogueado() || this.auth.obtenerRol() !== 'ADMIN') {
      this.router.navigate(['/login']);
      return;
    }
    this.cargar();
  }

  cargar() {
    this.service.listar().subscribe({
      next: (lista) => { this.productos = lista; this.cdr.markForCheck(); },
      error: () => { this.mensaje = 'Error al cargar'; this.cdr.markForCheck(); },
    });
  }

  limpiar() {
    this.id = null;
    this.nombreProducto = '';
    this.tipoProducto = 'FRUTA';
    this.cantidad = 0;
    this.precio = 0;
    this.urlImagen = '';
  }

  editar(p: Producto) {
    this.id = p.id!;
    this.nombreProducto = p.nombreProducto;
    this.tipoProducto = p.tipoProducto;
    this.cantidad = p.cantidad;
    this.precio = p.precio;
    this.urlImagen = p.urlImagen;
  }

  guardar() {
    const datos: Producto = {
      nombreProducto: this.nombreProducto,
      tipoProducto: this.tipoProducto,
      cantidad: this.cantidad,
      precio: this.precio,
      urlImagen: this.urlImagen,
    };

    const peticion = this.id == null
      ? this.service.crear(datos)
      : this.service.actualizar(this.id, datos);

    peticion.subscribe({
      next: (texto) => { this.mensaje = texto; this.limpiar(); this.cargar(); },
      error: () => { this.mensaje = 'Error al guardar'; this.cdr.markForCheck(); },
    });
  }

  eliminar(id: number) {
    this.service.eliminar(id).subscribe({
      next: (texto) => { this.mensaje = texto; this.cargar(); },
      error: () => { this.mensaje = 'Error al eliminar'; this.cdr.markForCheck(); },
    });
  }
}
