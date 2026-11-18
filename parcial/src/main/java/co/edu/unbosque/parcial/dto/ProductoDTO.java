package co.edu.unbosque.parcial.dto;

import java.util.Objects;

public class ProductoDTO {

	private Long id;
	private String role;
	private int cantidad;
	private double precio;
	private String urlImagen;

	public ProductoDTO() {
		// TODO Auto-generated constructor stub
	}

	public ProductoDTO(String role, int cantidad, double precio, String urlImagen) {
		super();
		this.role = role;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
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
		return "ProductoDTO [id=" + id + ", role=" + role + ", cantidad=" + cantidad + ", precio=" + precio
				+ ", urlImagen=" + urlImagen + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(Integer.valueOf(cantidad), id, Double.valueOf(precio), role, urlImagen);
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
				&& Double.doubleToLongBits(precio) == Double.doubleToLongBits(other.precio)
				&& Objects.equals(role, other.role) && Objects.equals(urlImagen, other.urlImagen);
	}

}
