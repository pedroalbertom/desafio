package tech.buildrun.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.WebApplicationException;
import tech.buildrun.entity.AdminEntity;
import tech.buildrun.exceptions.UserNotFoundException;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class AdminService {
    public AdminEntity createAdmin(AdminEntity adminEntity) {
        AdminEntity.persist(adminEntity);
        return adminEntity;
    }

    public AdminEntity updateAdmin(UUID adminId, AdminEntity adminEntity) {
        var admin = findById(adminId);

        admin.name = adminEntity.name;
        admin.email = adminEntity.email;
        admin.password = adminEntity.password;

        AdminEntity.persist(admin);

        return admin;
    }

    public List<AdminEntity> findAll(Integer page, Integer pageSize) {
        return AdminEntity.findAll()
                .page(page, pageSize)
                .list();
    }

    public AdminEntity findById(UUID adminId) {
        return (AdminEntity) AdminEntity.findByIdOptional(adminId)
                .orElseThrow(UserNotFoundException::new);
    }

    public void deleteById(UUID adminId) {
        var admin = findById(adminId);
        AdminEntity.deleteById(admin.adminId);
    }

    public AdminEntity login(String email, String password) {
        AdminEntity admin = AdminEntity.find("email", email).firstResult();

        if (admin == null) {
            throw new WebApplicationException("Admin não encontrado", 404);
        }

        if (!admin.password.equals(password)) {
            throw new WebApplicationException("Senha incorreta", 401);
        }

        return admin;
    }

    public void logout() {
    }
}