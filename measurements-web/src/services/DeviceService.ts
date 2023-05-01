import { ContentResponse, Device } from "../domain/api-response";
import http from "./http-common";

const getAll = () => {
    return http.get<ContentResponse<Device>>(`/device`);
};

const getById = (id: string) => {
    if (!id) {
        throw new TypeError(`Id must be provided.`);
    }

    return http.get<Device>(`/device/${id}`);
}

const save = (device: Device) => {
    if (device.id) {
        return http.put<Device>(`/device/${device.id}`, device);
    } else {
        return http.post<Device>(`/device`, { ...device, id: null });
    }
}

const deleteDevice = (id: string) => {
    if (!id) {
        throw new TypeError(`Id must be provided.`);
    }
    return http.delete<void>(`/device/${id}`);
}

const DeviceService = {
    getAll,
    getById,
    save,
    deleteDevice
}

export default DeviceService;