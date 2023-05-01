package eu.devx.measurements.repository;

import eu.devx.measurements.model.MeasurementPoint;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MeasurementPointRepository extends MongoRepository<MeasurementPoint, String> {
    List<MeasurementPoint> findAllByDeviceIdOrderByCreatedDesc(String deviceId);
}
