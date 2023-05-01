export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}
export interface Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
    sort: Sort;
}
export interface ContentResponse<T> {
    content: T[];
    sort: Sort;
    pageable: Pageable;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
export interface Device {
    id: string;
    name: string;
    created?: string;
    modified?: string;
}