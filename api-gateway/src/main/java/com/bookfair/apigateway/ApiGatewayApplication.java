package com.bookfair.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		return builder.routes()
				// Auth Service Routes
				.route("auth-register", r -> r.path("/api/auth/register")
						.uri("http://auth-service:8080"))
				.route("auth-login", r -> r.path("/api/auth/login")
						.uri("http://auth-service:8080"))
				.route("auth-logout", r -> r.path("/api/auth/logout")
						.uri("http://auth-service:8080"))
				.route("auth-users", r -> r.path("/api/auth/users/**", "/api/auth/user/**")
						.uri("http://auth-service:8080"))

				// Profile Service Routes
				.route("profile-all", r -> r.path("/api/profiles/**")
						.uri("http://profile-management-service:8081"))

				// Reservation Service Routes
				.route("reservations-all", r -> r.path("/api/reservations/**")
						.uri("http://reservation-management-service:8083"))

				// Stall Service Routes
				.route("stalls-all", r -> r.path("/api/stalls/**")
						.uri("http://stall-management-service:8082"))

				// Health check routes
				.route("auth-health", r -> r.path("/health/auth")
						.uri("http://auth-service:8080"))
				.route("profile-health", r -> r.path("/health/profile")
						.uri("http://profile-management-service:8081"))
				.route("reservation-health", r -> r.path("/health/reservation")
						.uri("http://reservation-management-service:8083"))
				.route("stall-health", r -> r.path("/health/stall")
						.uri("http://stall-management-service:8082"))

				.build();
	}
}
