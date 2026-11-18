package co.edu.unbosque.parcial.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import co.edu.unbosque.parcial.model.Producto;
import co.edu.unbosque.parcial.service.ProductoService;

public class ProductoController {
	@Autowired
	private ProductoService productoServ;

	@PostMapping("/crear")
	public ResponseEntity<String> crear(@RequestBody Producto nuevoProducto) {
		int resultado = productoServ.crear(nuevoProducto);
		if (resultado == 0) {
			return ResponseEntity.status(HttpStatus.CREATED).body("Producto creado correctamente");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No se pudo crear el producto");
	}

	@PutMapping("/actualizar/{id}")
	public ResponseEntity<String> actualizarPorId(@PathVariable("id") long id, @RequestBody Producto nuevoDato) {
		int resultado = productoServ.actualizarPorId(id, nuevoDato);
		if (resultado == 0) {
			return ResponseEntity.ok("Producto actualizado correctamente");
		} else if (resultado == 1) {
			return ResponseEntity.status(HttpStatus.CREATED).body("El ID no existía; se creó un nuevo registro");
		}

		return ResponseEntity.badRequest().body("Datos inválidos");
	}

	@DeleteMapping("/eliminar/{id}")
	public ResponseEntity<String> eliminarPorId(@PathVariable("id") long id) {
		int resultado = productoServ.eliminarPorId(id);
		if (resultado == 0) {
			return ResponseEntity.ok("Producto eliminado correctamente");
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró un producto con ese ID");
	}

	@GetMapping("/existe/{id}")
	public ResponseEntity<Boolean> existe(@PathVariable("id") long id) {
		return new ResponseEntity<>(productoServ.existe(id), HttpStatus.OK);
	}

	@GetMapping("/mostrarTodo")
	public ResponseEntity<List<Producto>> mostrarTodo() {
		return new ResponseEntity<>(productoServ.mostrarTodo(), HttpStatus.OK);
	}

}
