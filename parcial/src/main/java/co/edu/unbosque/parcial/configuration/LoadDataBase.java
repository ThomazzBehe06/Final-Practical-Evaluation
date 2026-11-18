package co.edu.unbosque.parcial.configuration;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import co.edu.unbosque.parcial.model.User;
import co.edu.unbosque.parcial.repository.UserRepository;

@Configuration
public class LoadDataBase {

	private static final Logger log = LoggerFactory.getLogger(LoadDataBase.class);

	
	private static final String ADMIN_USER = "sigma";
	private static final String ADMIN_PASS = "sigma123";

	@Bean
	CommandLineRunner initDatabase(UserRepository userRepo, PasswordEncoder passwordEncoder) {
		return args -> {
			Optional<User> found = userRepo.findByUsername(ADMIN_USER);

			if (found.isPresent()) {
				User admin;
				if (found.isPresent()) {
				    admin = found.get();
				} else {
				    admin = new User();
				    admin.setUsername(ADMIN_USER);
				}
				admin.setRole(User.Role.ADMIN);
				admin.setPassword(passwordEncoder.encode(ADMIN_PASS));
				userRepo.save(admin);
				log.info("Admin listo");
				
			} else {
				User admin = new User(ADMIN_USER, passwordEncoder.encode(ADMIN_PASS));
				admin.setRole(User.Role.ADMIN);
				userRepo.save(admin);
				log.info("Preloading admin user");
			}
		};
	}
}