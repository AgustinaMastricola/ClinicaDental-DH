package clinica.model;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@EqualsAndHashCode
public class DomicilioDTO {
    private Long id;
    private int numero;
    private String calle, localidad, provincia;

    public DomicilioDTO(int numero, String calle, String localidad, String provincia) {
        this.numero = numero;
        this.calle = calle;
        this.localidad = localidad;
        this.provincia = provincia;
    }
    public DomicilioDTO() {
    }
}
