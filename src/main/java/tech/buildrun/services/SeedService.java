package tech.buildrun.services;

import io.quarkus.runtime.Startup;
import jakarta.annotation.PostConstruct;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;
import tech.buildrun.entity.AdminEntity;
import tech.buildrun.entity.CourseEntity;
import tech.buildrun.entity.UserEntity;

import java.util.List;

@Singleton
@Startup
public class SeedService {

    private final UserService userService;

    @jakarta.inject.Inject
    public SeedService(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    void seed(){
        this.seedData();
    }

    @Transactional
    void seedData() {
        if (UserEntity.count() == 0) {
            for (int i = 1; i <= 20; i++) {
                UserEntity user = new UserEntity();
                user.name = "Usuário " + i;
                user.email = "usuario" + i + "@exemplo.com";
                user.persist();
            }
        }

        if (CourseEntity.count() == 0) {
            String[] nomesCursos = {"Java", "Angular", "Docker", "Kubernetes", "Node.js"};
            for (String nome : nomesCursos) {
                CourseEntity curso = new CourseEntity();
                curso.name = nome;
                curso.description = "Curso de " + nome + " para iniciantes";
                curso.durationInHours = 10;
                curso.persist();
            }
        }

        if (AdminEntity.count() == 0) {
            for (int i = 1; i <= 2; i++) {
                AdminEntity admin = new AdminEntity();
                admin.name = "Admin " + i;
                admin.email = "admin" + i + "@exemplo.com";
                admin.password = "admin";
                admin.persist();
            }
        }

        // Relacionamento: atribuir 2 users por curso
        List<CourseEntity> cursos = CourseEntity.listAll();
        List<UserEntity> users = UserEntity.listAll();

        for (int i = 0; i < (users.size()/2); i++) {
            CourseEntity curso = cursos.get(i / 2); // 10 usuários, 5 cursos → 2 por curso
            userService.assignUserToCourse(users.get(i).userId, curso.courseId);
        }
    }
}
