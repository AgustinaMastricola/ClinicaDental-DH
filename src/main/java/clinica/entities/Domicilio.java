package clinica.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Domicilios")
public class Domicilio {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "numero")
    private int numero;

    @Column(name = "calle")
    private String calle;

    @Column(name = "localidad")
    private String localidad;

    @Column(name = "provincia")
    private  String provincia;
}
