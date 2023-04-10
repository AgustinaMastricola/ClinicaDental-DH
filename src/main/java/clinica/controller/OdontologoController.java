package clinica.controller;
import clinica.model.OdontologoDTO;
import clinica.service.IOdontologoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/odontologos")


public class OdontologoController {
    @Autowired
    IOdontologoService odontologoService;

    @PostMapping
    public ResponseEntity<?> agregarOdontologo(@RequestBody OdontologoDTO odontologoDTO){
        odontologoService.registrarOdontologo(odontologoDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> modificarOdontologo(@RequestBody OdontologoDTO odontologoDTO){
        odontologoService.modificarOdontologo(odontologoDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarOdontologo(@PathVariable Long id){
        odontologoService.eliminarOdontologo(id);
        return ResponseEntity.status(HttpStatus.OK).body("Odontologo Eliminado");
    }

    @GetMapping("/{id}")
    public OdontologoDTO buscarUno(@PathVariable Long id){
        return odontologoService.buscarUnOdontologo(id);
    }

    @GetMapping("/all")
    public Collection<OdontologoDTO> listarTodos(){
        return odontologoService.buscarTodos();
    }
}
