// components/GenericList/GenericListItem.tsx

import { ListColumnConfig } from "./types.ts";

interface GenericListItemProps<T> {
    item: T;
    columns: ListColumnConfig<T>[];
    columnCount: number;
    onRowClick?: (item: T) => void;
    rowClassName?: string;
}

export function GenericListItem<T>({
                                       item,
                                       columns,
                                       columnCount,
                                       onRowClick,
                                       rowClassName = '',
                                   }: GenericListItemProps<T>) {
    return (
        <div
            className={`grid py-2 px-4 border-b border-[#F0E0D6] hover:bg-[#fff7f1] transition-colors justify-center
        ${onRowClick ? 'cursor-pointer' : ''} ${typeof rowClassName === 'function' ? rowClassName(item, columnCount) : rowClassName}`}
            style={{
                height: '4rem',
                gridTemplateColumns: columns.length > 0
                    ? columns.map(col => col.width || '1fr').join(' ')
                    : `repeat(${columnCount}, minmax(0, 1fr))`
            }}
            onClick={() => onRowClick && onRowClick(item)}
        >
            {columns.map((column) => (
                <div key={String(column.key)} className="text[#211f1d]">
                    {column.render
                        ? column.render(item[column.key], item)
                        : String(item[column.key] ?? '')
                    }
                </div>
            ))}
        </div>

    );
}

