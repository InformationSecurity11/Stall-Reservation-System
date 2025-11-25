package com.bookfair.apigateway.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Stall Reservation System API")
                        .version("1.0.0")
                        .description("Unified API Gateway for the Stall Reservation System providing centralized access to all microservices")
                        .contact(new Contact()
                                .name("System Admin")
                                .email("admin@bookfair.com")
                                .url("https://bookfair.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")))
                .servers(Arrays.asList(
                        new Server()
                                .url("http://localhost:8000")
                                .description("Development Server"),
                        new Server()
                                .url("http://api-gateway:8000")
                                .description("Docker Environment")));
    }
}
