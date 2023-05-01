package eu.devx.measurements.controller;

import eu.devx.measurements.model.MeasurementPoint;
import eu.devx.measurements.repository.MeasurementPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/measurement")
public class MeasurementController {
    private final MeasurementPointRepository measurementPointRepository;

    @Autowired
    public MeasurementController(MeasurementPointRepository measurementPointRepository) {
        this.measurementPointRepository = measurementPointRepository;
    }

    @PostMapping(path = "/{deviceId}")
    public void saveMeasurement(@PathVariable String deviceId, @RequestParam Double value) {
        MeasurementPoint point = new MeasurementPoint();
        point.setDeviceId(deviceId);
        point.setValue(value);
        point.setCreated(LocalDateTime.now());
        measurementPointRepository.save(point);
    }

    @GetMapping(path = "/{deviceId}")
    public Page<MeasurementPoint> getMeasurements(@PathVariable String deviceId, Pageable pageable) {
        return measurementPointRepository.findAllByDeviceIdOrderByCreatedDesc(deviceId, pageable);
    }
}
