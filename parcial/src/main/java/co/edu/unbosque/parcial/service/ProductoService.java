package co.edu.unbosque.parcial.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import co.edu.unbosque.parcial.model.Producto;
import co.edu.unbosque.parcial.repository.ProductoRepository;

@Service
public class ProductoService {
	@Autowired
	private ProductoRepository prodRepo;

	public int crear(Producto nuevoProducto) {
		try {
			prodRepo.save(nuevoProducto);
			return 0;
		} catch (Exception e) {
			return 1;
		}
	}

	public List<Producto> mostrarTodo() {
		return (List<Producto>) prodRepo.findAll();
	}

	public int eliminarPorId(long id) {
		Optional<Producto> encontrado = prodRepo.findById(id);
		if (encontrado.isPresent()) {
			prodRepo.delete(encontrado.get());
			return 0;
		} else {
			return 1;
		}
	}

	public int actualizarPorId(long id, Producto nuevoDato) {
		Optional<Producto> encontrado = prodRepo.findById(id);
		if (encontrado.isPresent() && nuevoDato != null) {
			Producto temp = encontrado.get();
			temp.setNombreProducto(nuevoDato.getNombreProducto());
			temp.setTipoProducto(nuevoDato.getTipoProducto());
			temp.setCantidad(nuevoDato.getCantidad());
			temp.setPrecio(nuevoDato.getPrecio());
			temp.setUrlImagen(nuevoDato.getUrlImagen());
			prodRepo.save(temp);
			return 0;
		} else if (encontrado.isEmpty()) {
			return 1;
		} else {
			return 2;
		}
	}

	public boolean existe(long id) {
		return prodRepo.existsById(id);
	}

	public Optional<Producto> findById(Long id) {
		return prodRepo.findById(id);
	}

	public int comprar(long id, int cantidadComprar) {
		Optional<Producto> encontrado = prodRepo.findById(id);
		if (encontrado.isPresent()) {
			Producto temp = encontrado.get();
			if (cantidadComprar <= 0) {
				return 3;
			}

			if (temp.getCantidad() >= cantidadComprar) {
				temp.setCantidad(temp.getCantidad() - cantidadComprar);
				prodRepo.save(temp);
				return 0;

			} else {
				return 2;
			}

		} else {
			return 1;
		}
	}

}
