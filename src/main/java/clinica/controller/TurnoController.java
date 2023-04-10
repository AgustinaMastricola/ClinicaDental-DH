package clinica.controller;
import clinica.model.TurnoDTO;
import clinica.service.ITurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/turnos")
public class TurnoController {
    @Autowired
    ITurnoService turnoService;

    @PostMapping
    public ResponseEntity<?> agregarTurno(@RequestBody TurnoDTO turnoDTO){
        turnoService.registrarTurno(turnoDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> modificarPaciente(@RequestBody TurnoDTO turnoDTO){
        turnoService.modificarTurno(turnoDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPaciente(@PathVariable Long id){
        turnoService.eliminarTurno(id);
        return ResponseEntity.status(HttpStatus.OK).body("Turno Eliminado");
    }

    @GetMapping("/{id}")
    public TurnoDTO buscarUno(@PathVariable Long id){
        return turnoService.buscarUnTurno(id);
    }

    @GetMapping("/all")
    public Collection<TurnoDTO> listarTodos(){
        return turnoService.buscarTodos();
    }
}
