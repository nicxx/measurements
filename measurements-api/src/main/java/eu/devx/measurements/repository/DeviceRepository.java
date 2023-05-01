package eu.devx.measurements.repository;

import eu.devx.measurements.model.Device;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DeviceRepository extends MongoRepository<Device, String> {

    Page<Device> findAllByTagsContains(List<String> tags, Pageable pageable);

}
