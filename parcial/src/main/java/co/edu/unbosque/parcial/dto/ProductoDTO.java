package co.edu.unbosque.parcial.dto;

import java.util.Objects;
import co.edu.unbosque.parcial.model.Producto.TipoProducto;

public class ProductoDTO {
	private Long id;
	private String nombreProducto;
	private TipoProducto tipoProducto;
	private int cantidad;
	private double precio;
	private String urlImagen;

	public ProductoDTO() {
		// TODO Auto-generated constructor stub
	}

	public ProductoDTO(String nombreProducto, TipoProducto tipoProducto, int cantidad, double precio,
			String urlImagen) {
		super();
		this.nombreProducto = nombreProducto;
		this.tipoProducto = tipoProducto;
		this.cantidad = cantidad;
		this.precio = precio;
		this.urlImagen = urlImagen;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombreProducto() {
		return nombreProducto;
	}

	public void setNombreProducto(String nombreProducto) {
		this.nombreProducto = nombreProducto;
	}

	public TipoProducto getTipoProducto() {
		return tipoProducto;
	}

	public void setTipoProducto(TipoProducto tipoProducto) {
		this.tipoProducto = tipoProducto;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public double getPrecio() {
		return precio;
	}

	public void setPrecio(double precio) {
		this.precio = precio;
	}

	public String getUrlImagen() {
		return urlImagen;
	}

	public void setUrlImagen(String urlImagen) {
		this.urlImagen = urlImagen;
	}

	@Override
	public String toString() {
		return "ProductoDTO [id=" + id + ", nombreProducto=" + nombreProducto + ", tipoProducto=" + tipoProducto
				+ ", cantidad=" + cantidad + ", precio=" + precio + ", urlImagen=" + urlImagen + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(Integer.valueOf(cantidad), id, nombreProducto, Double.valueOf(precio), tipoProducto,
				urlImagen);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProductoDTO other = (ProductoDTO) obj;
		return cantidad == other.cantidad && Objects.equals(id, other.id)
				&& Objects.equals(nombreProducto, other.nombreProducto)
				&& Double.doubleToLongBits(precio) == Double.doubleToLongBits(other.precio)
				&& tipoProducto == other.tipoProducto && Objects.equals(urlImagen, other.urlImagen);
	}

}
