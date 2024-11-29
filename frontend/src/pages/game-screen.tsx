import { useState } from "react";
import { Helmet } from "react-helmet";
import { ListColumnConfig } from "../types/types.ts";
import { GenericList } from "../components/List";
import {useNavigate} from "react-router-dom";

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
                            : "text-opacity-50 text-[#211f1d]"}`}
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

export default function GameScreen() {
    const buttonsList = [GameScreenSection.ModifyGame, GameScreenSection.CreateGame];
    const [, setActiveSection] = useState<GameScreenSection>(GameScreenSection.ModifyGame);

    // Estado para almacenar el usuario seleccionado
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

    const allowModify = (user: User) => {
        setSelectedUser(user);
    };

    const navigate = useNavigate();

    const handleButtonClick = (section: string) => {
        setActiveSection(section as GameScreenSection);

        if (section === GameScreenSection.CreateGame) {
            try {
                navigate("/game/create-game");
            } catch (error) {
                console.error("Error al navegar:", error);
            }
        } else if (section === GameScreenSection.ModifyGame) {
            //navigate("/modify-game"); // Navegar a la página de modificación
        }
    };

    // Datos de ejemplo
    const users: User[] = [
        { id: 1, name: "Juan Pérez", email: "juan@example.com", age: 30 },
        { id: 2, name: "María García", email: "maria@example.com", age: 25 },
        { id: 3, name: "Juan Pérez", email: "juan@example.com", age: 30 },
        { id: 4, name: "María García", email: "maria@example.com", age: 25 },
        { id: 5, name: "Juan Pérez", email: "juan@example.com", age: 30 },
        { id: 6, name: "María García", email: "maria@example.com", age: 25 },
        { id: 7, name: "Juan Pérez", email: "juan@example.com", age: 30 },
        { id: 8, name: "María García", email: "maria@example.com", age: 25 },
        { id: 9, name: "Juan Pérez", email: "juan@example.com", age: 30 },
        { id: 10, name: "María García", email: "maria@example.com", age: 25 }
    ];

    const userColumns: ListColumnConfig<User>[] = [
        {
            key: "id",
            header: "ID",
            width: "0.5fr",
            render: (value: string | number): JSX.Element => (
                <span className="font-bold text-[#F5672D]">#{value}</span>
            )
        },
        {
            key: "name",
            header: "Nombre",
            width: "1.5fr"
        },
        {
            key: "email",
            header: "Correo Electrónico",
            width: "2fr"
        },
        {
            key: "age",
            header: "Edad",
            width: "0.5fr",
            render: (value: number | string): string => `${value} años`
        }
    ];

    const rowClassName = (_item: User, index: number, isSelected?: boolean) =>
        isSelected
            ? "bg-[#F5672D] text-white"
            : index % 2 === 0
                ? "bg-[#F0E0D6]"
                : "bg-[#ffefe3]";

    return (
        <div id={"app-container"} className={"flex flex-col gap-4 w-full h-full p-0"}>
            <Helmet>
                <title>Game Screen</title>
            </Helmet>

            <header className="flex flex-col gap-3 text-white text-inter bg-[#312D2A] rounded-[32px] w-full h-[10%] p-5 text-lg text-extra bold justify-center">
                <h1 className="text-white text-2xl font-bold">Manage Games</h1>
            </header>

            <div className="flex flex-col gap-4 w-full flex-grow">
                <div className="bg-[#312D2A] rounded-[32px] w-full h-[85%] flex grow p-5">
                    <GenericList<User>
                        data={users}
                        columns={userColumns}
                        rowClassName={rowClassName}
                        className="mx-auto w-full"
                        onRowClick={allowModify}
                        selectedItem={selectedUser}
                    />
                </div>
                <div className="w-full h-[15%] bg-gray bg-[#312d2a] rounded-[32px]">
                    <TextButtons
                        className="flex flex-row gap-5 p-5 w-full h-full"
                        buttons={buttonsList}
                        activeButton={selectedUser ? GameScreenSection.ModifyGame : GameScreenSection.CreateGame}
                        onButtonClick={(section) => handleButtonClick(section)}
                    />
                </div>
            </div>

        </div>


    );
}
