package clinica.service.impl;
import clinica.model.DomicilioDTO;
import clinica.model.PacienteDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PacienteServiceTest {
    @Autowired
    PacienteService pacienteService;
    PacienteDTO paciente;
    DomicilioDTO domicilio;

    @BeforeEach
    public void setUp() {
        domicilio = new DomicilioDTO();
        domicilio.setCalle("calleTest");
        domicilio.setLocalidad("locTest");
        domicilio.setNumero(1111);
        domicilio.setProvincia("ProvTest");

        paciente = new PacienteDTO();
        paciente.setNombre("PacienteTest");
        paciente.setApellido("PacienteTest");
        paciente.setFecha_ingreso(LocalDate.now());
        paciente.setDni("11111111");
        paciente.setDomicilio(domicilio);
    }
    @Test
    public void testRegistrarPaciente(){
        PacienteDTO guardado = pacienteService.registrarPaciente(paciente);

        assertNotNull(pacienteService.buscarUnPaciente(guardado.getId()));
    }
    @Test
    public void testBuscarPaciente(){
        PacienteDTO guardado = pacienteService.registrarPaciente(paciente);

        PacienteDTO buscado = pacienteService.buscarUnPaciente(guardado.getId());

        assertEquals(guardado.getId(), buscado.getId());
        assertEquals(guardado.getApellido(), buscado.getApellido());
        assertEquals(guardado.getNombre(), buscado.getNombre());
        assertEquals(guardado.getFecha_ingreso(), buscado.getFecha_ingreso());
        assertEquals(guardado.getDni(), buscado.getDni());
        assertEquals(guardado.getDomicilio().getId(), buscado.getDomicilio().getId());
        assertEquals(guardado.getDomicilio().getCalle(), buscado.getDomicilio().getCalle());
        assertEquals(guardado.getDomicilio().getLocalidad(), buscado.getDomicilio().getLocalidad());
        assertEquals(guardado.getDomicilio().getProvincia(), buscado.getDomicilio().getProvincia());
        assertEquals(guardado.getDomicilio().getNumero(), buscado.getDomicilio().getNumero());
    }

    @Test
    public void testModificarPaciente(){
        PacienteDTO guardado = pacienteService.registrarPaciente(paciente);
        guardado.setApellido("ModificadoTest");
        guardado.setNombre("ModificadoTest");
        guardado.setDni("22222222");

        PacienteDTO modificado = pacienteService.modificarPaciente(guardado);

        assertEquals(guardado.getApellido(), modificado.getApellido());
        assertEquals(guardado.getNombre(), modificado.getNombre());
        assertEquals(guardado.getDni(), modificado.getDni());
    }

    @Test
    public void testBuscarTodos(){
        pacienteService.registrarPaciente(paciente);

        assertNotEquals(0, pacienteService.buscarTodos().size());
    }
    @Test
    public void testEliminarPaciente(){
        PacienteDTO guardado = pacienteService.registrarPaciente(paciente);

        pacienteService.eliminarPaciente(guardado.getId());

        assertNull(pacienteService.buscarUnPaciente(guardado.getId()));
    }

}