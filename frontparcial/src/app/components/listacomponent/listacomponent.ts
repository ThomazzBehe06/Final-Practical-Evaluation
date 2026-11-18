import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice';
import { Productoservice } from '../../services/productoservice';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-listacomponent',
  standalone: false,
  styleUrl: './listacomponent.css',
  templateUrl: './listacomponent.html',
})
export class Listacomponent implements OnInit {

  productos: any[] = [];
  mensaje = '';

  constructor(private service: Productoservice, private auth: AuthService,
              private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.auth.estaLogueado()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargar();
  }

  cargar() {
    this.service.listar().subscribe({
      next: (lista) => {
        this.productos = lista.map(p => ({ ...p, aComprar: 1 }));
        this.cdr.markForCheck();
      },
      error: () => { this.mensaje = 'Error al cargar'; this.cdr.markForCheck(); },
    });
  }

  comprar(p: any) {
    if (p.aComprar <= 0 || p.aComprar > p.cantidad) {
      this.mensaje = 'Cantidad no válida';
      return;
    }

    const datos: Producto = {
      nombreProducto: p.nombreProducto,
      tipoProducto: p.tipoProducto,
      cantidad: p.cantidad - p.aComprar,
      precio: p.precio,
      urlImagen: p.urlImagen,
    };

    this.service.actualizar(p.id, datos).subscribe({
      next: () => { this.mensaje = 'Compra realizada'; this.cargar(); },
      error: () => { this.mensaje = 'Error al comprar'; this.cdr.markForCheck(); },
    });
  }
}
