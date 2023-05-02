import { Device, Entity, ResponseContent } from "../domain/api-response";
import { Page, Sort } from "../domain/pagination";
import http from "./http-common";

const getAll = (sort?: Sort, page?: Page) => {
    const params = new URLSearchParams([]);

    if (sort && sort.field) {
        if (sort.direction && sort.direction === 'desc') {
            params.append('sort', sort.field + ',desc');
        } else {
            params.append('sort', sort.field);
        }
    }

    if (page) {
        if (page.index != undefined) {
            params.append('page', page.index.toString());
        }
        if (page.size != undefined) {
            params.append('size', page.size.toString());
        }
    }

    return http.get<ResponseContent<Entity>>(`/device`, { params: params });
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