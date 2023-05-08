package eu.devx.measurements;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableMongoAuditing
public class MeasurementsConfiguration {

    private final ConfigurationProperties configurationProperties;

    public MeasurementsConfiguration(ConfigurationProperties configurationProperties) {
        this.configurationProperties = configurationProperties;
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                        .addMapping("/**")
                        .allowedOriginPatterns(configurationProperties.getAllowedOrigins())
                        .allowedMethods(configurationProperties.getAllowedMethods());
            }
        };
    }
}
