package tech.buildrun.services;

import jakarta.enterprise.context.ApplicationScoped;
import tech.buildrun.entity.UserEntity;
import tech.buildrun.exceptions.UserNotFoundException;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class UserService {
    public UserEntity createUser(UserEntity user) {
        UserEntity.persist(user);
        return user;
    }

    public List<UserEntity> findAll(Integer page, Integer size) {
        return UserEntity.findAll()
                .page(page, size)
                .list();
    }

    public UserEntity findById(UUID id) {
        return (UserEntity) UserEntity.findByIdOptional(id)
                .orElseThrow(UserNotFoundException::new);
    }
}