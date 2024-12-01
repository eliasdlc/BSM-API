// components/GenericList/index.tsx
import { GenericListItem } from "./list-items.tsx";
import {ListProps} from "../../types/types.ts";

export function GenericList<T>({
                                   data = [],
                                   columns = [],
                                   className = '',
                                   headerClassName = '',
                                   rowClassName = (item: T, index: number): string => '',
                                   onRowClick,
                                    selectedItem,
                               }: ListProps<T> & { selectedItem?: T }) {
    // Calcula el número de columnas de forma segura
    const columnCount = columns.length || 1;



    return (
        <div className={`w-full h-full border-[#ffefe3] rounded-[16px] overflow-hidden shadow-md justify-center ${className}`}>
            {/* Encabezado de la tabla */}
            {columns.length > 0 && (
                <div
                    className={`grid bg-[#ffefe3] py-3 px-4 border-b border-[#F0E0D6] justify-center items-center ${headerClassName}`}
                    style={{
                        // Si se proporcionan anchos personalizados, úsalos
                        gridTemplateColumns: columns.length > 0
                            ? columns.map(col => col.width || '1fr').join(' ')
                            // Si no, distribuye uniformemente
                            : `repeat(${columnCount}, minmax(0, 1fr))`
                    }}
                >
                    {columns.map((column) => (
                        <div key={String(column.key)} className="font-bold text-black justify-center items-center">
                            {column.header}
                        </div>
                    ))}
                </div>
            )}

            {/* Cuerpo de la lista */}
            <div className={"h-[510px] overflow-y-auto"}
                 style={{
                     maxHeight: '850px',
                 }}
            >
                {data.length === 0 ? (
                    <div className="text-center py-4 text-[#ffefe3] ">
                        No hay elementos para mostrar
                    </div>
                ) : (
                    data.map((item: T, index: number) => {
                        const rowClass = rowClassName(item, index);
                        const isSelectedRow = JSON.stringify(selectedItem) === JSON.stringify(item);

                        return (
                            <GenericListItem
                                key={index}
                                item={item}
                                columns={columns}
                                columnCount={columnCount}
                                onRowClick={onRowClick}
                                isSelected={isSelectedRow}
                                rowClassName={rowClass}
                            />
                        );
                    })
                )}

            </div>
        </div>
    );
}

