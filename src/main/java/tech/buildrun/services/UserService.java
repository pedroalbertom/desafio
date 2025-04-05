package tech.buildrun.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import tech.buildrun.dto.UserDTO;
import tech.buildrun.entity.CourseEntity;
import tech.buildrun.entity.UserEntity;
import tech.buildrun.mapper.UserMapper;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@ApplicationScoped
public class UserService {
    public UserDTO createUser(UserDTO userDTO) {
        boolean emailExists = UserEntity.find("email", userDTO.email).firstResult() != null;

        if (emailExists) throw new WebApplicationException("E-mail já está em uso", 409);

        UserEntity userEntity = UserMapper.toEntity(userDTO);
        UserEntity.persist(userEntity);

        return UserMapper.toDTO(userEntity);
    }

    public UserDTO updateUser(UUID userId, UserDTO userDTO) {
        var user = findByIdEntity(userId);

        user.name = userDTO.name;
        user.email = userDTO.email;

        UserEntity.persist(user);

        return UserMapper.toDTO(user);
    }

    public List<UserDTO> findAll(Integer page, Integer pageSize) {
        List<UserEntity> users = UserEntity.findAll().page(page, pageSize).list();

        if (users == null) throw new WebApplicationException("Users not found", 404);

        return users.stream().map(UserMapper::toDTO).collect(Collectors.toList());
    }

    public UserDTO findById(UUID userId) {
        UserEntity user = findByIdEntity(userId);

        return UserMapper.toDTO(user);
    }

    private UserEntity findByIdEntity(UUID userId) {
        Optional<UserEntity> userOptional = UserEntity.findByIdOptional(userId);

        if (userOptional.isEmpty()) throw new WebApplicationException("User not found", 404);

        return userOptional.get();
    }

    public void deleteById(UUID userId) {
        var user = findByIdEntity(userId);
        UserEntity.deleteById(user.userId);
    }

    @Transactional
    public void assignUserToCourse(UUID userId, UUID courseId) {
        UserEntity user = UserEntity.findById(userId);
        CourseEntity course = CourseEntity.findById(courseId);

        if (user == null) throw new WebApplicationException("User not found", 404);
        if (course == null) throw new WebApplicationException("Course not found", 404);

        if (user.course != null) throw new WebApplicationException("User is already assigned to a course", 400);

        user.course = course;
    }

    @Transactional
    public void unassignUserFromCourse(UUID userId) {
        UserEntity user = UserEntity.findById(userId);

        if (user == null) throw new WebApplicationException("User not found", 404);

        if (user.course == null) throw new WebApplicationException("User is not assigned to any course", 400);

        user.course = null;
    }
}