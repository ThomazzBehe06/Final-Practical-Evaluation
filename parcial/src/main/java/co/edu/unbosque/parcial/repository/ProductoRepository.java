package co.edu.unbosque.parcial.repository;

import org.springframework.data.repository.CrudRepository;
import co.edu.unbosque.parcial.model.Producto;

public interface ProductoRepository extends CrudRepository<Producto, Long> {
	
	public void deleteById(Long id);
	

}
