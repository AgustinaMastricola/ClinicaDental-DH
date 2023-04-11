package clinica;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/index.html","pages/turno.html").permitAll()
                .requestMatchers("pages/odontologo.html", "pages/paciente.html").hasRole("ADMIN")
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .and()
                .logout();
        return http.build();
    }
}
