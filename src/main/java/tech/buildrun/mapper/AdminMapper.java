package tech.buildrun.mapper;

import tech.buildrun.dto.AdminDTO;
import tech.buildrun.entity.AdminEntity;

public class AdminMapper {

    public static AdminEntity toEntity(AdminDTO dto) {
        AdminEntity entity = new AdminEntity();
        entity.name = dto.getName();
        entity.email = dto.getEmail();
        entity.password = dto.getPassword();
        return entity;
    }

    public static AdminDTO toDTO(AdminEntity entity) {
        AdminDTO dto = new AdminDTO();
        dto.setAdminId(entity.adminId);
        dto.setName(entity.name);
        dto.setEmail(entity.email);
        dto.setPassword(entity.password);
        return dto;
    }
}
