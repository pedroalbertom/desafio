package tech.buildrun.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_courses")
public class CourseEntity extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID courseId;

    public String name;
    public String description;
    public int durationInHours;

    @OneToMany(mappedBy = "course")
    public List<UserEntity> users;

}
