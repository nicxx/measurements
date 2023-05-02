type Order = 'asc' | 'desc';

export interface Sort {
    field: string;
    direction: Order;
}

export interface Page {
    index: number;
    size: number;
}