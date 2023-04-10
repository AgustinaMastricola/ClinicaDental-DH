package clinica.model;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
@Getter
@Setter
@EqualsAndHashCode
public class TurnoDTO {
    private Long id;
    private LocalDateTime fecha_hora;
    private PacienteDTO paciente;
    private OdontologoDTO odontologo;

    public TurnoDTO(LocalDateTime fecha_hora, PacienteDTO paciente, OdontologoDTO odontologo) {
        this.fecha_hora = fecha_hora;
        this.paciente = paciente;
        this.odontologo = odontologo;
    }
    public TurnoDTO() {
    }
}
