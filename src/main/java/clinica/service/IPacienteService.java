package clinica.service;
import clinica.model.PacienteDTO;
import java.util.Set;
public interface IPacienteService {
    PacienteDTO registrarPaciente(PacienteDTO pacienteDTO);
    void eliminarPaciente(Long id);
    PacienteDTO modificarPaciente(PacienteDTO pacienteDTO);
    PacienteDTO buscarUnPaciente(Long id);
    Set<PacienteDTO> buscarTodos();
}
