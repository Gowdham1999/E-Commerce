package com.ecommerce.configuration;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;

import java.io.IOException;
@Configuration
//@EnableWebSecurity
public class SpringWebSecurity {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.authorizeRequests(
                auth -> {
                    try {
                        auth.requestMatchers("/orders/**")
                                .authenticated().and()
                                .oauth2ResourceServer()
                                .jwt();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
        );

        http.cors();
        http.csrf().disable();

//      Unauthenticated response Body
        http.exceptionHandling().authenticationEntryPoint(new Http401AuthenticationEntryPoint("headerValue"));

        return http.build();
    }

    private class Http401AuthenticationEntryPoint implements AuthenticationEntryPoint {
        private final String headerValue;

        public Http401AuthenticationEntryPoint(String headerValue) {
            this.headerValue = headerValue;
        }

        @Override
        public void commence(HttpServletRequest request, HttpServletResponse response,
                             AuthenticationException authException) throws IOException, ServletException {
            response.setHeader("WWW-Authenticate", this.headerValue);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                    authException.getMessage());
        }
    }

}
