package eu.devx.measurements.controller;

import eu.devx.measurements.model.MeasurementPoint;
import eu.devx.measurements.repository.MeasurementPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/measurement")
public class MeasurementController {
    private final MeasurementPointRepository measurementPointRepository;

    @Autowired
    public MeasurementController(MeasurementPointRepository measurementPointRepository) {
        this.measurementPointRepository = measurementPointRepository;
    }

    @PostMapping(path = "/{deviceId}/measurement")
    public void saveMeasurement(@PathVariable String deviceId, @RequestParam Double value) {
        MeasurementPoint point = new MeasurementPoint();
        point.setDeviceId(deviceId);
        point.setValue(value);
        point.setCreated(LocalDateTime.now());
        measurementPointRepository.save(point);
    }

    @GetMapping(path = "/{deviceId}/measurement")
    public List<MeasurementPoint> getMeasurements(@PathVariable String deviceId) {
        return measurementPointRepository.findAllByDeviceIdOrderByCreatedDesc(deviceId);
    }
}
