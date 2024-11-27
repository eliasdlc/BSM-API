import { useSignal } from "https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/dist/signals.js";
import { GenericList, ListColumnConfig } from "../components/List/index.tsx";
import { JSX, render } from "npm:preact@10.25.0";
import CreateGame from "./game/create-game.tsx";
import { Head } from "$fresh/runtime.ts";
import { Link } from "../components/link.tsx";
import Sidebar from "../components/Sidebar.tsx";

enum GameScreenSection {
    ModifyGame = "Modify Game (Select an element)",
    CreateGame = "Create Game"
}

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
            {buttons && buttons.length > 0 ? (
                buttons.map((text, index) => (
                    <button
                        key={index}
                        className={`bg-[#ffefe3] text-lg rounded-[16px] p-2 w-full h-full normal-shadow
                ${activeButton === text
                            ? "text-[#211f1d] font-bold" // Solo cambiar el color y estilo cuando esté activo
                            : "text-opacity-50 text-[#211f1d]"}
                        `}
                        onClick={() => onButtonClick(text)}
                    >
                        {text}
                    </button>
                ))
            ) : (
                <div>No buttons available</div>
            )}
        </div>
    );
}

interface GameScreenProps {
    path?: string
}

export default function GameScreen({ path }: GameScreenProps) {

    const buttonsList = [GameScreenSection.ModifyGame, GameScreenSection.CreateGame];
    const activeSection = useSignal<GameScreenSection>(GameScreenSection.ModifyGame);
    const activeButton = useSignal(buttonsList[0]);

    // Estado para almacenar el usuario seleccionado
    const selectedUser = useSignal<User | null>(null);

    const allowModify = (user: User) => {
        // Cuando un usuario es seleccionado, se actualiza el estado
        selectedUser.value = user;
    }

    const handleButtonClick = (section: string) => {
        // Type assertion to ensure it's a valid GameScreenSection
        activeSection.value = section as GameScreenSection;

        const container = document.getElementById("app-container");

        if (container) {
            container.innerHTML = ''; // Limpiar contenido previo
        }

        switch (activeSection.value) {
            case GameScreenSection.CreateGame:
                render(
                    <Link href="/create-game">
                        <CreateGame />
                    </Link>,
                    container
                );
                break;
            case GameScreenSection.ModifyGame:
                render(
                    <Link href="/modify-game">Create Game</Link>,
                    container
                );
                break;
        }
    };

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
            render: (value: number | string): string => `${value} años`
        }
    ];

    const rowClassName = (item: User, index: number) =>
        index % 2 === 0 ? 'bg-[#F0E0D6]' : 'bg-[#ffefe3] ';

    return (
        <div id={"2app-container"} className={"flex flex-col gap-4 w-full h-full p-0"}>

            <Head>
                <title>Game Screen</title>
            </Head>

            <header
                className={
                    "flex flex-col gap-3 text-white text-inter bg-[#312D2A] rounded-[32px] w-full h-[10%] p-5 text-lg text-extra bold justify-center"
                }>
                <h1 className={"text-white text-2xl font-bold"}>Create a new game</h1>
            </header>

            <div className={"flex flex-col gap-4 w-full flex-grow"}>
                <div className={" bg-[#312D2A] rounded-[32px] w-full h-[85%] flex grow p-5"}>
                    <GenericList<User>
                        data={users}
                        columns={userColumns}
                        rowClassName={rowClassName}
                        className="mx-auto w-full"
                        onRowClick={allowModify} // Cambié esto para pasar el usuario seleccionado
                    />
                </div>
                <div className={"w-full h-[15%] bg-gray bg-[#312d2a] rounded-[32px] "}>
                    <TextButtons className={"flex flex-row gap-5 p-5 w-full h-full "} buttons={buttonsList}
                                 activeButton={selectedUser.value ? GameScreenSection.ModifyGame : GameScreenSection.CreateGame} // Cambié la lógica aquí
                                 onButtonClick={(section) => handleButtonClick(section as GameScreenSection)} />
                </div>
            </div>
        </div>
    )
}
