package clinica.service.impl;
import clinica.entities.Rol;
import clinica.entities.Usuario;
import clinica.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UsuarioService implements UserDetailsService {
    @Autowired
    IUsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.getUsuarioByNombre(username);

        Set<GrantedAuthority> autorizaciones = new HashSet<>();

        Rol rol = usuario.get().getRolUser();
        GrantedAuthority auth = new SimpleGrantedAuthority(rol.getTipoRol());
        autorizaciones.add(auth);

        User userDetail = new User(usuario.get().getNombre(), "{noop}"+usuario.get().getPassword(),true, true, true, true, autorizaciones);
        return userDetail;
    }
}
