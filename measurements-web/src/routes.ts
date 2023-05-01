import { FC } from "react";
import DeviceDetails from "./pages/DeviceDetails";
import DeviceList from "./pages/DeviceList";

interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC
}

export const routes: Array<Route> = [
    {
        key: 'device-list-route',
        title: 'Device list',
        path: '/',
        enabled: true,
        component: DeviceList
    },
    {
        key: 'device-details-route',
        title: 'Device details',
        path: '/devices/:id',
        enabled: true,
        component: DeviceDetails
    }
]