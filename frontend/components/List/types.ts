// components/GenericList/types.ts


import React from "https://esm.sh/react@18";
import {JSX} from "npm:preact@10.25.0";

export interface ListColumnConfig<T> {
    key: keyof T;
    header: string;
    // deno-lint-ignore no-explicit-any
    render?: (value: string | number, item: T) => any;
    width?: string;
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