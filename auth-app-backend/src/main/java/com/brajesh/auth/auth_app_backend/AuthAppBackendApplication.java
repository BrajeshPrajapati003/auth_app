package com.brajesh.auth.auth_app_backend;

import com.brajesh.auth.auth_app_backend.auth.config.AppConstants;
import com.brajesh.auth.auth_app_backend.auth.entities.Role;
import com.brajesh.auth.auth_app_backend.auth.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AuthAppBackendApplication implements CommandLineRunner { // When the project will run CommandLineRunner will also get executed

	@Autowired
	private RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(AuthAppBackendApplication.class, args);
	}


//	CommandLineRunner
	@Override
	public void run(String... args) throws Exception{

//		We will create some default user role
//		ADMIN
//		GUEST

//		roleRepository.findByName("ROLE_" + AppConstants.ADMIN_ROLE).ifPresentOrElse(role -> {
//			System.out.println("Admin Role Already Exists: " + role.getName());
//		}, ()-> {
//			Role role = new Role();
//			role.setId(UUID.randomUUID());
//			role.setName("ROLE_" +  AppConstants.ADMIN_ROLE);
//			roleRepository.save(role);
//		});
//
//		roleRepository.findByName("ROLE_" + AppConstants.GUEST_ROLE).ifPresentOrElse(role -> {
//			System.out.println("Guest Role Already Exists: " + role.getName());
//		}, ()-> {
//			Role role = new Role();
//			role.setName("ROLE_" + AppConstants.GUEST_ROLE);
//			role.setId(UUID.randomUUID());
//			roleRepository.save(role);
//		});

		createRoleIfNotExists("ROLE_" + AppConstants.ADMIN_ROLE);
		createRoleIfNotExists("ROLE_" + AppConstants.GUEST_ROLE);
	}

	private void createRoleIfNotExists(String roleName){
		roleRepository.findByName(roleName).ifPresentOrElse(
				role -> System.out.println(roleName + " already exists"),
				()-> {
					Role role = new Role();
					role.setName(roleName);
					roleRepository.save(role);
					System.out.println(roleName + " created...");
				}
		);
	}
}
