package tech.buildrun.mapper;

import tech.buildrun.dto.UserDTO;
import tech.buildrun.entity.UserEntity;

public class UserMapper {
    public static UserDTO toDTO(UserEntity entity) {
        UserDTO dto = new UserDTO();
        dto.userId = entity.userId;
        dto.name = entity.name;
        dto.email = entity.email;
        dto.courseId = entity.course != null ? entity.course.courseId : null;

        return dto;
    }

    public static UserEntity toEntity(UserDTO dto) {
        UserEntity entity = new UserEntity();
        entity.userId = dto.userId;
        entity.name = dto.name;
        entity.email = dto.email;

        return entity;
    }
}
