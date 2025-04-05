package tech.buildrun.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

public class CourseDTO {
    public UUID courseId;
    public List<UserDTO> users;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 100, message = "Nome do curso deve ter entre 2 e 100 caracteres")
    public String name;

    @NotBlank(message = "Descrição é obrigatória")
    @Size(min = 5, max = 255, message = "Descrição deve ter entre 5 e 255 caracteres")
    public String description;

    @Min(value = 1, message = "Duração mínima deve ser de 1 hora")
    public int durationInHours;
}
