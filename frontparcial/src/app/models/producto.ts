export interface Producto {
  id?: number;
  nombre: string;
  cantidad: number;
  precio: number;
  urlImagen: string;
  tipo: 'FRUTA' | 'VERDURA';
}
