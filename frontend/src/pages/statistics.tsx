import {GenericList} from "../components/List";
import {ListColumnConfig} from "../types/types.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa useNavigate


function TextButtons({
                         buttons,
                         activeButton,
                         onButtonClick,
                         className
                     }: {
    buttons: string[];
    activeButton: string;
    onButtonClick: (button: string) => void;
    className?: string;
}) {
    return (
        <div className={className}>
            {buttons.map((text, index) => (
                <button
                    key={index}
                    className={`
                        ${activeButton === text
                        ? "text-white font-bold" // Añadí font-bold
                        : "text-opacity-25 text-white font-bold" // Añadí font-bold
                    } 
                    text-xl rounded-md transition-all duration-200 hover:bg-opacity-50`} // Mejoré accesibilidad con px, py y hover
                    onClick={() => onButtonClick(text)}
                >
                    {text}
                </button>
            ))}
        </div>
    );
}

interface Game {
    CodJuego: string;
    Descripcion: string;
    Equipo1: string;
    Equipo2: string;
    Fecha: string;
}

export default function StoredProcedure() {

    const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined);
    const [games, setGames] = useState<Game[]>([]);
    const [, setLoading] = useState<boolean>(true);
    const headerButtons = ["Main Screen", "Statistics"];
    const navigate = useNavigate(); // Inicializa el hook de navegación

    const [activeButton, setActiveButton] = useState<string>(headerButtons[1]);

    const handleButtonClick = (button: string) => {
        setActiveButton(button); // Actualiza el botón activo

        switch (button) {
            case "Main Screen":
                navigate("/main-screen"); // Navega a la ruta principal
                break;
            case "Statistics":
                navigate("/home/stored-procedure"); // Navega a la ruta de estadísticas
                break;
        }
    };
    const allowModify = (user: Game) => {
        setSelectedGame(user);

        if( window.confirm("Do you want to see the statistics of this game?") ){
            navigate(`/home/stored-procedure/${user.CodJuego}`); // Navega a la ruta con el ID del juego
        }

    };

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get<Game[]>("http://localhost:3000/Juego");
                setGames(response.data);
            } catch (error) {
                console.error("Error fetching games:", error);
            } finally {
                setLoading(false); // Fin de la carga
            }
        };

        fetchGames().then(() => console.log("Games fetched"));
    }, []);


    const userColumns: ListColumnConfig<Game>[] = [
        {
            key: "CodJuego",
            header: "ID",
            width: "0.3fr",
            render: (value: string | number): JSX.Element => (
                <span className="font-bold text-[#F5672D]">#{value}</span>
            )
        },
        {
            key: "Descripcion",
            header: "Description",
        },
        {
            key: "Equipo1",
            header: "Local Team",
        },
        {
            key: "Equipo2",
            header: "Visitor Team",
        },
        {
            key: "Fecha",
            header: "Date",
        }
    ];

    const rowClassName = (_item: Game, index: number, isSelected?: boolean) =>
        isSelected
            ? "bg-[#F5672D] text-white"
            : index % 2 === 0
                ? "bg-[#F0E0D6]"
                : "bg-[#ffefe3]";

    return (
        <div className="flex flex-col h-full w-full gap-5">
            {/* Header */}
            <header
                className="flex flex-row text-white text-xl bg-[#312D2A] rounded-[32px] w-full h-[90px] p-7 text-lg font-bold">
                <TextButtons
                    buttons={headerButtons}
                    activeButton={activeButton}
                    onButtonClick={handleButtonClick}
                    className="flex gap-7 flex-row justify-center items-center"
                />
            </header>
            <div className={"flex flex-col w-full gap-5 p-5 bg-[#312D2A] rounded-[32px]"}>

                <header
                    className={"flex flex-col text-white bg-[#312D2A] rounded-[32px] w-full text-lg font-bold justify-center"}>
                    <h1 className={"text-white text-2xl font-bold"}>Select a Game</h1>
                </header>

                <GenericList<Game>
                    data={games}
                    columns={userColumns}
                    rowClassName={rowClassName}
                    className="mx-auto w-full"
                    onRowClick={allowModify}
                    selectedItem={selectedGame}
                />

            </div>
        </div>


    )
}