package clinica.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Roles")
public class Rol {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;
    @Column(name = "rol")
    private String tipoRol;
}
