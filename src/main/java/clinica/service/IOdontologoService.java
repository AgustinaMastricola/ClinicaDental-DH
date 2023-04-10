package clinica.service;
import clinica.model.OdontologoDTO;

import java.util.Set;
public interface IOdontologoService {
    OdontologoDTO registrarOdontologo(OdontologoDTO odontologoDTO) ;
    void eliminarOdontologo(Long id);
    OdontologoDTO modificarOdontologo(OdontologoDTO odontologoDTO);
    OdontologoDTO buscarUnOdontologo(Long id);
    Set<OdontologoDTO> buscarTodos();
}
