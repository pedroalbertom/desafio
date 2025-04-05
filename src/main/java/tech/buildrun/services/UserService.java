package tech.buildrun.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import tech.buildrun.entity.CourseEntity;
import tech.buildrun.entity.UserEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class UserService {
    public UserEntity createUser(UserEntity userEntity) {

        UserEntity.persist(userEntity);

        return userEntity;
    }

    public UserEntity updateUser(UUID userId, UserEntity userEntity) {
        var user = findById(userId);

        if (user == null) throw new WebApplicationException("User not found", 404);

        user.name = userEntity.name;
        user.email = userEntity.email;

        UserEntity.persist(user);

        return user;
    }

    public List<UserEntity> findAll(Integer page, Integer pageSize) {
        List<UserEntity> users = UserEntity.findAll().page(page, pageSize).list();

        if (users == null) throw new WebApplicationException("Users not found", 404);

        return users;
    }

    public UserEntity findById(UUID userId) {
        Optional<UserEntity> userOptional = UserEntity.findByIdOptional(userId);

        if (userOptional.isEmpty()) throw new WebApplicationException("User not found", 404);

        return userOptional.get();
    }

    public void deleteById(UUID userId) {
        var user = findById(userId);

        if (user == null) throw new WebApplicationException("User not found", 404);

        UserEntity.deleteById(user.userId);
    }

    @Transactional
    public void assignUserToCourse(Long userId, Long courseId) {
        UserEntity user = UserEntity.findById(userId);
        CourseEntity course = CourseEntity.findById(courseId);

        if (user == null || course == null) throw new WebApplicationException("User or Course not found", 404);

        user.course = course;
    }
}