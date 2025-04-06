package tech.buildrun.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_users")
public class UserEntity extends PanacheEntityBase {
    @Column(nullable = false)
    public String name;

    @Column(unique = true, nullable = false)
    public String email;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID userId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "course_id")
    public CourseEntity course;

    public static List<UserEntity> findUsersWithoutCourses() {
        List<UserEntity> result = find("course IS NULL").list();
        return result;
    }

    public static void unassignAllUsersFromCourse(CourseEntity course) {
        List<UserEntity> users = find("course = ?1", course).list();
        for (UserEntity user : users) {
            user.course = null;
        }
    }

}
