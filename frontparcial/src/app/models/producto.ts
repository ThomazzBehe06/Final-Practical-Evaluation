export interface Producto {
  id?: number;
  nombreProducto: string;
  tipoProducto: 'FRUTA' | 'VERDURA';
  cantidad: number;
  precio: number;
  urlImagen: string;
}
