package tech.buildrun.dto;

import java.util.List;
import java.util.UUID;

public class CourseDTO {
    public UUID courseId;
    public String name;
    public String description;
    public Integer durationInHours;
    public List<UserDTO> users;
}
