package eu.devx.measurements.controller;

import eu.devx.measurements.model.Device;
import eu.devx.measurements.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/device")
public class DeviceController {

    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceController(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    @GetMapping
    public Page<Device> getDeviceList(Pageable pageable,
                                      @RequestParam(value = "tags", required = false) List<String> tags) {
        if (tags != null && !tags.isEmpty()) {
            return deviceRepository.findAllByTagsContains(tags, pageable);
        }

        return deviceRepository.findAll(pageable);
    }

    @PostMapping
    public Device saveDevice(@RequestBody Device device) {
        device.setId(null);
        return deviceRepository.save(device);
    }

    @GetMapping(path = "/{deviceId}")
    public Device getDeviceById(@PathVariable String deviceId) {
        return deviceRepository.findById(deviceId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatusCode.valueOf(404), "Device was not found."));
    }

    @PutMapping(path = "/{deviceId}")
    public Device updateDevice(@PathVariable String deviceId, @RequestBody Device device) {
        Device savedDevice = deviceRepository.findById(deviceId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatusCode.valueOf(404), "Device was not found."));

        savedDevice.setName(device.getName());
        savedDevice.setTags(device.getTags());

        return deviceRepository.save(savedDevice);
    }

    @DeleteMapping(path = "/{deviceId}")
    public void deleteDevice(@PathVariable String deviceId) {
        deviceRepository.deleteById(deviceId);
    }
}
