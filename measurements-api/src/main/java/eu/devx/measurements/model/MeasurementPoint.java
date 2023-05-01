package eu.devx.measurements.model;


import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class MeasurementPoint implements Persistable<String> {

    @Id
    private String id;

    private String deviceId;

    private Double value;

    @CreatedDate
    private LocalDateTime created;

    @Override
    public boolean isNew() {
        return created == null;
    }
}
