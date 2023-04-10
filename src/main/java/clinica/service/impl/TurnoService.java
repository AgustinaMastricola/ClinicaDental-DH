package clinica.service.impl;
import clinica.config.SpringConfig;
import clinica.entities.Paciente;
import clinica.entities.Turno;
import clinica.model.PacienteDTO;
import clinica.model.TurnoDTO;
import clinica.repository.ITurnoRepository;
import clinica.service.ITurnoService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
@Service
public class TurnoService implements ITurnoService {
    private static final Logger logger = Logger.getLogger(TurnoService.class);
    @Autowired
    private ITurnoRepository turnoRepository;
    @Autowired
    SpringConfig springConfig;

    @Override
    public TurnoDTO registrarTurno(TurnoDTO turnoDTO) {
        logger.info("Iniciando registro de turno nuevo");
        Turno turno = springConfig.getModelMapper().map(turnoDTO, Turno.class);
        logger.info("Turno agendado");
        return springConfig.getModelMapper().map(turnoRepository.save(turno), TurnoDTO.class);
    }
    @Override
    public void eliminarTurno(Long id) {
        turnoRepository.deleteById(id);
        logger.info("Se eliminó el turno con id: " + id);
    }
    @Override
    public TurnoDTO modificarTurno(TurnoDTO turnoDTO) {
        logger.info("Modificando turno id: " + turnoDTO.getId());
        TurnoDTO turnoModificado = null;
        Optional<Turno> turnoAModificar = turnoRepository.findById(turnoDTO.getId());
        if (turnoAModificar.isPresent()) {
            Turno turno = springConfig.getModelMapper().map(turnoDTO, Turno.class);
            turnoModificado = springConfig.getModelMapper().map(turnoRepository.save(turno), TurnoDTO.class);
        }
        logger.info("Turno modificado");
        return turnoModificado;
    }
    @Override
    public TurnoDTO buscarUnTurno(Long id) {
        logger.info("Buscando turno id: " + id);
        Optional<Turno> turno = turnoRepository.findById(id);
        TurnoDTO turnoDTO = null;
        if (turno.isPresent()){
            turnoDTO = springConfig.getModelMapper().map(turno, TurnoDTO.class);
            logger.info("Turno encontrado por Id");
        }
        return turnoDTO;
    }
    @Override
    public Set<TurnoDTO> buscarTodos() {
        logger.info("Buscando todos los turnos");
        List<Turno> turnos = turnoRepository.findAll();
        Set<TurnoDTO> turnosDTOS = new HashSet<>();
        for (Turno turno: turnos){
            turnosDTOS.add(springConfig.getModelMapper().map(turno, TurnoDTO.class));
            logger.info("Se encontraron todos los Turnos");
        }
        return turnosDTOS;
    }
}
