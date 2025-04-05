package tech.buildrun.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_courses")
public class CourseEntity extends PanacheEntityBase {
    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public String description;

    @Column(nullable = false)
    public int durationInHours;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID courseId;

    @OneToMany(mappedBy = "course")
    public List<UserEntity> users;

}
