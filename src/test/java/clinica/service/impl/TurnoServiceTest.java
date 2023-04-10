package clinica.service.impl;

import clinica.model.DomicilioDTO;
import clinica.model.OdontologoDTO;
import clinica.model.PacienteDTO;
import clinica.model.TurnoDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TurnoServiceTest {
    @Autowired
    private PacienteService pacienteService;
    private PacienteDTO paciente;

    @Autowired
    private OdontologoService odontologoService;
    private OdontologoDTO odontologo;
    @Autowired
    private TurnoService turnoService;
    private TurnoDTO turno;

    @BeforeEach
    public void setUp() {
        odontologo = new OdontologoDTO();
        odontologo.setNombre("NombreTest");
        odontologo.setApellido("ApellidoTest");
        odontologo.setNro_matricula("1234");

        DomicilioDTO domicilio = new DomicilioDTO();
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

        turno = new TurnoDTO();
    }

    @Test
    public void testRegistrarTurno(){
        PacienteDTO pGuardado = pacienteService.registrarPaciente(paciente);
        OdontologoDTO oGuardado = odontologoService.registrarOdontologo(odontologo);
        turno.setFecha_hora(LocalDateTime.now());
        turno.setOdontologo(oGuardado);
        turno.setPaciente(pGuardado);

        TurnoDTO turnoGuardado = turnoService.registrarTurno(turno);

        assertNotNull(turnoService.buscarUnTurno(turnoGuardado.getId()));
    }

    @Test
    public void testBuscarTurno(){
        PacienteDTO pGuardado = pacienteService.registrarPaciente(paciente);
        OdontologoDTO oGuardado = odontologoService.registrarOdontologo(odontologo);

        String fechaCadena = "2022-08-05 22:51:53";
        DateTimeFormatter formateador = new DateTimeFormatterBuilder().parseCaseInsensitive().append(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")).toFormatter();
        LocalDateTime fecha = LocalDateTime.parse(fechaCadena, formateador);
        turno.setFecha_hora(fecha);
        turno.setOdontologo(oGuardado);
        turno.setPaciente(pGuardado);
        TurnoDTO turnoGuardado = turnoService.registrarTurno(turno);

        TurnoDTO turnoBuscado = turnoService.buscarUnTurno(turnoGuardado.getId());

        assertEquals(turnoBuscado, turnoGuardado);
    }

    //Modifica solo la fecha
    @Test
    public void testModificarTurno(){
        PacienteDTO pGuardado = pacienteService.registrarPaciente(paciente);
        OdontologoDTO oGuardado = odontologoService.registrarOdontologo(odontologo);
        turno.setFecha_hora(LocalDateTime.now());
        turno.setOdontologo(oGuardado);
        turno.setPaciente(pGuardado);
        TurnoDTO turnoGuardado = turnoService.registrarTurno(turno);
        turnoGuardado.setFecha_hora(LocalDateTime.of(2023,11,21,18,30));

        TurnoDTO turnoModificado = turnoService.modificarTurno(turnoGuardado);

        assertEquals(turnoModificado.getFecha_hora(), turnoGuardado.getFecha_hora());
    }

    @Test
    public void testBuscarTodos(){
        PacienteDTO pGuardado = pacienteService.registrarPaciente(paciente);
        OdontologoDTO oGuardado = odontologoService.registrarOdontologo(odontologo);
        turno.setFecha_hora(LocalDateTime.now());
        turno.setOdontologo(oGuardado);
        turno.setPaciente(pGuardado);
        turnoService.registrarTurno(turno);

        assertNotEquals(0, turnoService.buscarTodos().size());
    }
    @Test
    public void testEliminarTurno(){
        PacienteDTO pGuardado = pacienteService.registrarPaciente(paciente);
        OdontologoDTO oGuardado = odontologoService.registrarOdontologo(odontologo);
        turno.setFecha_hora(LocalDateTime.now());
        turno.setOdontologo(oGuardado);
        turno.setPaciente(pGuardado);
        TurnoDTO guardado = turnoService.registrarTurno(turno);

        turnoService.eliminarTurno(guardado.getId());

        assertNull(turnoService.buscarUnTurno(guardado.getId()));
    }

}