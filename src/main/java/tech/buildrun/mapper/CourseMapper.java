package tech.buildrun.mapper;

import tech.buildrun.dto.CourseDTO;
import tech.buildrun.entity.CourseEntity;

import java.util.stream.Collectors;

public class CourseMapper {
    public static CourseDTO toDTO(CourseEntity entity) {

        CourseDTO dto = new CourseDTO();
        dto.courseId = entity.courseId;
        dto.name = entity.name;
        dto.description = entity.description;
        dto.durationInHours = entity.durationInHours;
        dto.users = entity.users != null ?
                entity.users.stream().map(UserMapper::toDTO).collect(Collectors.toList()) : null;

        return dto;
    }

    public static CourseEntity toEntity(CourseDTO dto) {

        CourseEntity entity = new CourseEntity();
        entity.courseId = dto.courseId;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.durationInHours = dto.durationInHours;

        return entity;
    }
}
