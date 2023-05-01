package eu.devx.measurements.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document
public class Device implements Persistable<String> {

    @Id
    private String id;

    private String name;

    private List<String> tags;

    @Version
    private String version;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @CreatedDate
    private LocalDateTime created;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @LastModifiedDate
    private LocalDateTime modified;

    @Override
    public boolean isNew() {
        return created == null;
    }
}
