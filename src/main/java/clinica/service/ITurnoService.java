package clinica.service;
import clinica.model.TurnoDTO;
import java.util.Set;
public interface ITurnoService {
    TurnoDTO registrarTurno(TurnoDTO turnoDTO);
    void eliminarTurno(Long id);
    TurnoDTO modificarTurno(TurnoDTO turnoDTO);
    TurnoDTO buscarUnTurno(Long id);
    Set<TurnoDTO> buscarTodos();
}
