package clinica.service.impl;
import clinica.config.SpringConfig;
import clinica.entities.Paciente;
import clinica.model.PacienteDTO;
import clinica.repository.IPacienteRepository;
import clinica.service.IPacienteService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PacienteService implements IPacienteService {
    private static final Logger logger = Logger.getLogger(PacienteService.class);
    @Autowired
    IPacienteRepository pacienteRepository;
    @Autowired
    SpringConfig springConfig;


    @Override
    public PacienteDTO registrarPaciente(PacienteDTO pacienteDTO) {
        logger.info("Iniciando registro de Paciente");
        Paciente paciente = springConfig.getModelMapper().map(pacienteDTO, Paciente.class);
        logger.info("Paciente guardado id: " + paciente.getId());
        return springConfig.getModelMapper().map(pacienteRepository.save(paciente), PacienteDTO.class);
    }
    @Override
    public void eliminarPaciente(Long id) {
        pacienteRepository.deleteById(id);
        logger.info("Se eliminó el paciente con id: " + id);
    }
    @Override
    public PacienteDTO modificarPaciente(PacienteDTO pacienteDTO) {
        logger.info("Modificando paciente id: " + pacienteDTO.getId());
        PacienteDTO pacienteModificado = null;
        Optional<Paciente> pacienteAModificar = pacienteRepository.findById(pacienteDTO.getId());
        if (pacienteAModificar.isPresent()) {
            Paciente paciente = springConfig.getModelMapper().map(pacienteDTO, Paciente.class);
            pacienteModificado = springConfig.getModelMapper().map(pacienteRepository.save(paciente), PacienteDTO.class);
        }
        logger.info("Paciente modificado");
        return pacienteModificado;
    }
    @Override
    public PacienteDTO buscarUnPaciente(Long id) {
        logger.info("Buscando paciente id: " + id);
        Optional<Paciente> paciente = pacienteRepository.findById(id);
        PacienteDTO pacienteDTO = null;
        if (paciente.isPresent()){
            pacienteDTO =  springConfig.getModelMapper().map(paciente, PacienteDTO.class);
        }
        logger.info("Paciente encontrado por Id");
        return pacienteDTO;
    }
    @Override
    public Set<PacienteDTO> buscarTodos() {
        logger.info("Buscando todos los pacientes");
        List<Paciente> pacientes = pacienteRepository.findAll();
        Set<PacienteDTO> pacientesDTO = new HashSet<>();
        for (Paciente paciente: pacientes){
            pacientesDTO.add( springConfig.getModelMapper().map(paciente, PacienteDTO.class));
        }
        logger.info("Se encontraron todos los Pacientes");
        return pacientesDTO;
    }
}
