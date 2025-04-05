package tech.buildrun.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.WebApplicationException;
import tech.buildrun.entity.AdminEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class AdminService {
    public AdminEntity createAdmin(AdminEntity adminEntity) {

        AdminEntity.persist(adminEntity);

        return adminEntity;
    }

    public AdminEntity updateAdmin(UUID adminId, AdminEntity adminEntity) {
        var admin = findById(adminId);

        if (admin == null) throw new WebApplicationException("Admin not found", 404);

        admin.name = adminEntity.name;
        admin.email = adminEntity.email;
        admin.password = adminEntity.password;

        AdminEntity.persist(admin);

        return admin;
    }

    public List<AdminEntity> findAll(Integer page, Integer pageSize) {
        List<AdminEntity> admins = AdminEntity.findAll().page(page, pageSize).list();

        if (admins == null) throw new WebApplicationException("Admins not found", 404);

        return admins;
    }

    public AdminEntity findById(UUID adminId) {
        Optional<AdminEntity> adminOptional = AdminEntity.findByIdOptional(adminId);

        if (adminOptional.isEmpty()) throw new WebApplicationException("Admin not found", 404);

        return adminOptional.get();
    }

    public void deleteById(UUID adminId) {
        var admin = findById(adminId);

        if (admin == null) throw new WebApplicationException("Admin not found", 404);

        AdminEntity.deleteById(admin.adminId);
    }

    public AdminEntity login(String email, String password) {
        AdminEntity admin = AdminEntity.find("email", email).firstResult();

        if (admin == null) throw new WebApplicationException("Admin não encontrado", 404);

        if (!admin.password.equals(password)) throw new WebApplicationException("Senha incorreta", 401);

        return admin;
    }

    public void logout() {
    }
}