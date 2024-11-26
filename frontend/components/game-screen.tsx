import {GenericList, ListColumnConfig} from "./List/index.tsx";

// Tipo de datos de ejemplo
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

function TextButtons({
                         buttons,
                         activeButton,
                         onButtonClick,
                         className
                     }: {
    buttons: string[],
    activeButton: string,
    onButtonClick: (button: string) => void,
    className?: string
}) {
    return (
        <div className={className}>
            {buttons.map((text, index) => (
                <button
                    key={index}
                    className={`
                        ${activeButton === text
                        ? "text-white text-extra bold"
                        : "text-opacity-25 text-white text-extra bold"
                    }
                    `}
                    onClick={() => onButtonClick(text)}
                >
                    {text}
                </button>
            ))}
        </div>
    );
}

export default function GameScreen() {

    const buttonsList = ["Create Game", "Modify Game"]


    // Datos de ejemplo
    const users: User[] = [
        { id: 1, name: 'Juan Pérez', email: 'juan@example.com', age: 30 },
        { id: 2, name: 'María García', email: 'maria@example.com', age: 25 },
        { id: 3, name: 'Juan Pérez', email: 'juan@example.com', age: 30 },
        { id: 4, name: 'María García', email: 'maria@example.com', age: 25 },
        { id: 5, name: 'Juan Pérez', email: 'juan@example.com', age: 30 },
        { id: 6, name: 'María García', email: 'maria@example.com', age: 25 },
        { id: 7, name: 'Juan Pérez', email: 'juan@example.com', age: 30 },
        { id: 8, name: 'María García', email: 'maria@example.com', age: 25 },
        { id: 9, name: 'Juan Pérez', email: 'juan@example.com', age: 30 },
        { id: 10, name: 'María García', email: 'maria@example.com', age: 25 },
    ];

    const userColumns: ListColumnConfig<User>[] = [
        {
            key: 'id',
            header: 'ID',
            width: '0.5fr',
            // Ejemplo de renderizado personalizado
            render: (value: string | number): JSX.Element =>
                (<span className="font-bold text-[#F5672D]">#{value}</span>),
        },
        {
            key: 'name',
            header: 'Nombre',
            width: '1.5fr',
        },
        {
            key: 'email',
            header: 'Correo Electrónico',
            width: '2fr',
        },
        {
            key: 'age',
            header: 'Edad',
            width: '0.5fr',
            render: (value: number | string) => `${value} años`
        }
    ];

    const rowClassName = (item: User, index: number) =>
        index % 2 === 0 ? 'bg-[#F0E0D6]' : 'bg-white hover:bg-black hover:text-white transition-colors';

    return (
        <div className={"flex flex-col gap-4 w-full h-full p-0"}>
            <header
                className={
                    "flex flex-col gap-3 text-white text-inter bg-[#312D2A] rounded-[32px] w-full h-[90px] p-5 text-lg text-extra bold justify-center"
                }>
                <h1 className={"text-white text-2xl font-bold"}>Create a new game</h1>
            </header>

            <div className={"flex flex-col gap-4 w-full flex-grow"}>
                <div className={" bg-[#312D2A] rounded-[32px] w-full flex grow p-5"}>
                    <GenericList<User>
                        data={users}
                        columns={userColumns}
                        rowClassName={rowClassName}
                        className="mx-auto w-full"
                        onRowClick={(user) => console.log('Usuario seleccionado:', user)}
                    />


                </div>
                <div className={"w-full h-[15%] bg-gray bg-[#312D2A] rounded-[32px]"}>

                </div>
            </div>
        </div>
    )
}