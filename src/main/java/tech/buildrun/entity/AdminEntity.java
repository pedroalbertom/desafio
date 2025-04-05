package tech.buildrun.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "tb_admins")
public class AdminEntity extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID adminId;

    @Column(nullable = false)
    public String name;

    @Column(unique = true, nullable = false)
    public String email;

    @Column(nullable = false)
    public String password;



}
