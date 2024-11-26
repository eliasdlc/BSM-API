// components/GenericList/types.ts


import React from "https://esm.sh/react@18";

export interface ListColumnConfig<T> {
    key: keyof T;
    header: string;
    render?: (value: string | number, item: T) => React.ReactNode;
    width?: string;
    className?: string;
    hoverText?: (value: string | number, item: T) => string;
}

export interface ListProps<T> {
    data: T[];
    columns: ListColumnConfig<T>[];
    className?: string;
    headerClassName?: string;
    rowClassName?: string;
    onRowClick?: (item: T) => void;
}