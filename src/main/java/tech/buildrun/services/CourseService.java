package tech.buildrun.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import tech.buildrun.dto.CourseDTO;
import tech.buildrun.entity.CourseEntity;
import tech.buildrun.mapper.CourseMapper;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@ApplicationScoped
public class CourseService {
    public CourseDTO createCourse(CourseDTO courseDTO) {
        CourseEntity entity = CourseMapper.toEntity(courseDTO);
        CourseEntity.persist(entity);
        return CourseMapper.toDTO(entity);
    }

    public CourseDTO updateCourse(UUID courseId, CourseDTO courseDTO) {
        var course = findByIdEntity(courseId);

        course.name = courseDTO.name;
        course.description = courseDTO.description;
        course.durationInHours = courseDTO.durationInHours;

        CourseEntity.persist(course);

        return CourseMapper.toDTO(course);
    }

    public List<CourseDTO> findAll(Integer page, Integer pageSize) {
        List<CourseEntity> courses = CourseEntity.findAll().page(page, pageSize).list();

        if (courses == null) throw new WebApplicationException("Courses not found", 404);

        return courses.stream().map(CourseMapper::toDTO).collect(Collectors.toList());
    }

    public CourseDTO findById(UUID courseId) {
        CourseEntity course = findByIdEntity(courseId);
        return CourseMapper.toDTO(course);
    }

    private CourseEntity findByIdEntity(UUID courseId) {
        Optional<CourseEntity> courseOptional = CourseEntity.findByIdOptional(courseId);
        if (courseOptional.isEmpty()) throw new WebApplicationException("Course not found", 404);
        return courseOptional.get();
    }

    public void deleteById(UUID courseId) {
        var course = findByIdEntity(courseId);
        CourseEntity.deleteById(course.courseId);
    }
}
