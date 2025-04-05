package tech.buildrun.services;

import jakarta.enterprise.context.ApplicationScoped;
import tech.buildrun.entity.UserEntity;
import tech.buildrun.exceptions.UserNotFoundException;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class UserService {
    public UserEntity createUser(UserEntity userEntity) {
        UserEntity.persist(userEntity);
        return userEntity;
    }

    public UserEntity updateUser(UUID userId, UserEntity userEntity) {
        var user = findById(userId);

        user.name = userEntity.name;
        user.email = userEntity.email;

        UserEntity.persist(user);

        return user;
    }

    public List<UserEntity> findAll(Integer page, Integer pageSize) {
        return UserEntity.findAll()
                .page(page, pageSize)
                .list();
    }

    public UserEntity findById(UUID userId) {
        return (UserEntity) UserEntity.findByIdOptional(userId)
                .orElseThrow(UserNotFoundException::new);
    }

    public void deleteById(UUID userId) {
        var user = findById(userId);
        UserEntity.deleteById(user.userId);
    }
}