package tech.buildrun.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "tb_users")
public class UserEntity extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID userId;

    public String name;
    public String email;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "course_id")
    public CourseEntity course;

}
