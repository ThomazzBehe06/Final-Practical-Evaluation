import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Productoservice } from '../../services/productoservice';


@Component({
  selector: 'app-productocomponent',
  standalone: false,
  styleUrl: './productocomponent.css',
  templateUrl: './productocomponent.html',
})
export class Productocomponent {
  constructor(
    private productoService: Productoservice,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}
}
