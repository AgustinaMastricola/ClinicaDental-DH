package clinica.controller;
import clinica.model.PacienteDTO;
import clinica.service.IPacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {
    @Autowired
    IPacienteService pacienteService;

    @PostMapping
    public ResponseEntity<?> agregarPaciente(@RequestBody PacienteDTO pacienteDTO){
        pacienteService.registrarPaciente(pacienteDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> modificarPaciente(@RequestBody PacienteDTO pacienteDTO){
        pacienteService.modificarPaciente(pacienteDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPaciente(@PathVariable Long id){
        pacienteService.eliminarPaciente(id);
        return ResponseEntity.status(HttpStatus.OK).body("Paciente Eliminado");
    }

    @GetMapping("/{id}")
    public PacienteDTO buscarUno(@PathVariable Long id){
        return pacienteService.buscarUnPaciente(id);
    }

    @GetMapping("/all")
    public Collection<PacienteDTO> listarTodos(){
        return pacienteService.buscarTodos();
    }
}
