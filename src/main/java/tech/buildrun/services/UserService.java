package tech.buildrun.services;

import jakarta.enterprise.context.ApplicationScoped;
import tech.buildrun.entity.UserEntity;

import java.util.List;

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
}