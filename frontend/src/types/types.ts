// components/GenericList/types.ts



export interface ListColumnConfig<T> {
    key: keyof T;
    width?: string;
    render?: (value: T[keyof T], item: T) => JSX.Element | string | number;
    header: string;
    className?: string;
    hoverText?: (value: string | number, item: T) => string;
}

export interface ListProps<T> {
    data: T[];
    columns: ListColumnConfig<T>[];
    className?: string;
    headerClassName?: string;
    rowClassName?: (item: T, index: number) => string;
    onRowClick?: (item: T) => void;
}