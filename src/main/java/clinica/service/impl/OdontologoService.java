package clinica.service.impl;
import clinica.config.SpringConfig;
import clinica.entities.Odontologo;
import clinica.model.OdontologoDTO;
import clinica.repository.IOdontologoRepository;
import clinica.service.IOdontologoService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class OdontologoService implements IOdontologoService {
    private static final Logger logger = Logger.getLogger(OdontologoService.class);
    @Autowired
    private IOdontologoRepository odontologoRepository;
    @Autowired
    SpringConfig springConfig;

    @Override
    public OdontologoDTO registrarOdontologo(OdontologoDTO odontologoDTO) {
        logger.info("Iniciando registro de Odontologo");
        Odontologo odontologo = springConfig.getModelMapper().map(odontologoDTO, Odontologo.class);
        logger.info("Odontologo Guardado");
        return springConfig.getModelMapper().map(odontologoRepository.save(odontologo), OdontologoDTO.class);
    }
    @Override
    public void eliminarOdontologo(Long id) {
        odontologoRepository.deleteById(id);
        logger.info("Se eliminó el odontologo con id: " + id);
    }
    @Override
    public OdontologoDTO modificarOdontologo(OdontologoDTO odontologoDTO) {
        logger.info("Modificando odontologo id: " + odontologoDTO.getId());
        OdontologoDTO odontologoModificado = null;
        Optional<Odontologo> odontologoAModificar = odontologoRepository.findById(odontologoDTO.getId());
        if (odontologoAModificar.isPresent()) {
            Odontologo odontologo = springConfig.getModelMapper().map(odontologoDTO, Odontologo.class);
            odontologoModificado = springConfig.getModelMapper().map(odontologoRepository.save(odontologo), OdontologoDTO.class);
        }
        logger.info("Odontologo Modificado");
        return odontologoModificado;
    }
    @Override
    public OdontologoDTO buscarUnOdontologo(Long id) {
        logger.info("Buscando odontologo id: " + id);
        Optional<Odontologo> odontologo = odontologoRepository.findById(id);
        OdontologoDTO odontologoDTO = null;
        if (odontologo.isPresent()){
            odontologoDTO = springConfig.getModelMapper().map(odontologo, OdontologoDTO.class);
        }
        logger.info("Odontologo encontrado por Id");
        return odontologoDTO;

    }
    @Override
    public Set<OdontologoDTO> buscarTodos() {
        logger.info("Buscando todos los odontologos");
        List<Odontologo> odontologos = odontologoRepository.findAll();
        Set<OdontologoDTO> odontologoDTOS = new HashSet<>();

        for (Odontologo odontologo: odontologos){
            odontologoDTOS.add(springConfig.getModelMapper().map(odontologo, OdontologoDTO.class));
        }
        logger.info("Se encontraron todos los Odontologos");
        return odontologoDTOS;
    }
}
