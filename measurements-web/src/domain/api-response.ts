import { ReactNode } from "react";

export interface ResponseSort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}
export interface ResponsePageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
    sort: ResponseSort;
}
export interface ResponseContent<T> {
    content: T[];
    sort: ResponseSort;
    pageable: ResponsePageable;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
export interface Entity {
    id: string;
    [key: string]: number | string | ReactNode;
}
export interface Device {
    id: string;
    name: string;
    created?: string;
    modified?: string;
}