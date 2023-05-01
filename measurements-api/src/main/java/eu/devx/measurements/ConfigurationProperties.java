package eu.devx.measurements;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Getter
@Setter
@Configuration
@org.springframework.boot.context.properties.ConfigurationProperties(prefix = "measurements")
public class ConfigurationProperties {

    private String[] allowedOrigins;
    private String[] allowedMethods;

}
