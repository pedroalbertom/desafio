package tech.buildrun.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.WebApplicationException;
import tech.buildrun.dto.AdminDTO;
import tech.buildrun.entity.AdminEntity;
import tech.buildrun.mapper.AdminMapper;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class AdminService {

    public AdminDTO createAdmin(AdminDTO adminDTO) {
        AdminEntity entity = AdminMapper.toEntity(adminDTO);
        AdminEntity.persist(entity);
        return AdminMapper.toDTO(entity);
    }

    public AdminDTO updateAdmin(UUID adminId, AdminDTO adminDTO) {
        var admin = findByIdEntity(adminId);

        admin.name = adminDTO.getName();
        admin.email = adminDTO.getEmail();
        admin.password = adminDTO.getPassword();

        AdminEntity.persist(admin);
        return AdminMapper.toDTO(admin);
    }

    public List<AdminDTO> findAll(Integer page, Integer pageSize) {
        List<AdminEntity> admins = AdminEntity.findAll().page(page, pageSize).list();
        return admins.stream().map(AdminMapper::toDTO).toList();
    }

    public AdminDTO findById(UUID adminId) {
        return AdminMapper.toDTO(findByIdEntity(adminId));
    }

    public void deleteById(UUID adminId) {
        AdminEntity.deleteById(adminId);
    }

    public AdminDTO login(String email, String password) {
        AdminEntity admin = AdminEntity.find("email", email).firstResult();

        if (admin == null) throw new WebApplicationException("Admin não encontrado", 404);
        if (!admin.password.equals(password)) throw new WebApplicationException("Senha incorreta", 401);

        return AdminMapper.toDTO(admin);
    }

    public void logout() {}

    private AdminEntity findByIdEntity(UUID adminId) {
        Optional<AdminEntity> adminOptional = AdminEntity.findByIdOptional(adminId);

        if (adminOptional.isEmpty()) throw new WebApplicationException("Admin not found", 404);

        return adminOptional.get();
    }
}
