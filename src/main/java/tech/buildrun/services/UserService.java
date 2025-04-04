package tech.buildrun.services;

import jakarta.enterprise.context.ApplicationScoped;
import tech.buildrun.entity.UserEntity;

@ApplicationScoped
public class UserService {
    public UserEntity createUser(UserEntity user) {
        UserEntity.persist(user);
        return user;
    }
}
