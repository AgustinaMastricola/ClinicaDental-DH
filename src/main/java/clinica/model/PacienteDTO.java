package clinica.model;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
@Getter
@Setter
@EqualsAndHashCode
public class PacienteDTO {
    private Long id;
    private String nombre, apellido, dni;
    private LocalDate fecha_ingreso;
    private DomicilioDTO domicilio;

    public PacienteDTO(String nombre, String apellido, String dni, LocalDate fecha_ingreso, DomicilioDTO domicilio) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fecha_ingreso = fecha_ingreso;
        this.domicilio = domicilio;
    }
    public PacienteDTO() {
    }
}
