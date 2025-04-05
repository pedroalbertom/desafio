package tech.buildrun.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public class UserDTO {
    public UUID userId;
    public UUID courseId;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    public String name;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    public String email;

}