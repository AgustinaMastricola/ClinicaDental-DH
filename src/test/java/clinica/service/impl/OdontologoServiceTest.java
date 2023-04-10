package clinica.service.impl;
import clinica.model.OdontologoDTO;
import clinica.service.IOdontologoService;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class OdontologoServiceTest {
    @Autowired
    IOdontologoService odontologoService;
    OdontologoDTO odontologo;

    @BeforeEach
    public void setUp() {
        odontologo = new OdontologoDTO();
        odontologo.setNombre("NombreTest");
        odontologo.setApellido("ApellidoTest");
        odontologo.setNro_matricula("1234");
    }

    @Test
    public void testRegistrarOdontologo(){
        OdontologoDTO guardado = odontologoService.registrarOdontologo(odontologo);
        assertNotNull(odontologoService.buscarUnOdontologo(guardado.getId()));
    }
    @Test
    public void testBuscarOdontologo(){
        OdontologoDTO guardado = odontologoService.registrarOdontologo(odontologo);
        OdontologoDTO buscado = odontologoService.buscarUnOdontologo(guardado.getId());
        assertEquals(guardado.getId(), buscado.getId());
        assertEquals(guardado.getApellido(), buscado.getApellido());
        assertEquals(guardado.getNombre(), buscado.getNombre());
        assertEquals(guardado.getNro_matricula(), buscado.getNro_matricula());
    }

    @Test
    public void testModificarOdontologo(){
        OdontologoDTO guardado = odontologoService.registrarOdontologo(odontologo);
        guardado.setApellido("ModificadoTest");
        guardado.setNombre("ModificadoTest");
        guardado.setNro_matricula("1111");

        OdontologoDTO modificado = odontologoService.modificarOdontologo(guardado);
        assertEquals(guardado.getApellido(), modificado.getApellido());
        assertEquals(guardado.getNombre(), modificado.getNombre());
        assertEquals(guardado.getNro_matricula(), modificado.getNro_matricula());
    }

    @Test
    public void testBuscarTodos(){
        odontologoService.registrarOdontologo(odontologo);
        assertNotEquals(0, odontologoService.buscarTodos().size());
    }
    @Test
    public void testEliminarOdontologo(){
        OdontologoDTO guardado = odontologoService.registrarOdontologo(odontologo);
        odontologoService.eliminarOdontologo(guardado.getId());
        assertNull(odontologoService.buscarUnOdontologo(guardado.getId()));
    }
}