package clinica.model;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@EqualsAndHashCode
public class OdontologoDTO {
    private Long id;
    private String nombre, apellido, nro_matricula;
}
