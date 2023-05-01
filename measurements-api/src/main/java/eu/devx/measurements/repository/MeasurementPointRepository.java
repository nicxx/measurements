package eu.devx.measurements.repository;

import eu.devx.measurements.model.MeasurementPoint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MeasurementPointRepository extends MongoRepository<MeasurementPoint, String> {
    Page<MeasurementPoint> findAllByDeviceIdOrderByCreatedDesc(String deviceId, Pageable pageable);
}
