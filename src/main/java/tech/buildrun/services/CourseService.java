package tech.buildrun.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import tech.buildrun.entity.CourseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class CourseService {
    public CourseEntity createCourse(CourseEntity courseEntity) {

        CourseEntity.persist(courseEntity);

        return courseEntity;
    }

    public CourseEntity updateCourse(UUID courseId, CourseEntity courseEntity) {
        var course = findById(courseId);

        if (course == null) throw new WebApplicationException("Course not found", 404);

        course.name = courseEntity.name;
        course.description = courseEntity.description;
        course.durationInHours = courseEntity.durationInHours;

        CourseEntity.persist(course);

        return course;
    }

    public List<CourseEntity> findAll(Integer page, Integer pageSize) {
        List<CourseEntity> courses = CourseEntity.findAll().page(page, pageSize).list();

        if (courses == null) throw new WebApplicationException("Courses not found", 404);

        return courses;
    }

    public CourseEntity findById(UUID courseId) {
        Optional<CourseEntity> courseOptional = CourseEntity.findByIdOptional(courseId);

        if (courseOptional.isEmpty()) throw new WebApplicationException("Course not found", 404);

        return courseOptional.get();
    }

    public void deleteById(UUID courseId) {
        var course = findById(courseId);

        if (course == null) throw new WebApplicationException("Course not found", 404);

        CourseEntity.deleteById(course.courseId);
    }

    @Transactional
    public CourseEntity getCourseWithUsers(UUID courseId) {
        CourseEntity course = CourseEntity.findById(courseId);

        if (course == null) throw new WebApplicationException("Course not found", 404);

        course.users.size();

        return course;
    }

}