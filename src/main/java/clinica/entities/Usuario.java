package clinica.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table(name = "Usuarios")
public class Usuario {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "password")
    private String password;
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "id_rol", nullable = false)
    private Rol rolUser;
}
