import {useEffect, useState} from "react";
import { Helmet } from "react-helmet";
import { ListColumnConfig } from "../types/types.ts";
import { GenericList } from "../components/List";
import {useNavigate} from "react-router-dom";
import axios from "axios";

enum GameScreenSection {
    ModifyGame = "Modify Game (Select an element)",
    DeleteGame = "Delete Game",
    CreateGame = "Create Game"
}

// Tipo de datos de ejemplo
interface Game {
    CodJuego: string;
    Descripcion: string;
    Equipo1: string;
    Equipo2: string;
    Fecha: string;
}

function TextButtons({
                         buttons,
                         isGameSelected,
                         onButtonClick,
                         className
                     }: {
    buttons: string[],
    isGameSelected: boolean,
    onButtonClick: (button: string) => void,
    className?: string
}) {
    return (
        <div className={className}>
            {buttons && buttons.length > 0 ? (
                buttons.map((text, index) => {
                    // Determinamos si un botón debe estar activo
                    const isActive =
                        (text === GameScreenSection.CreateGame && !isGameSelected) ||
                        (isGameSelected && (text === GameScreenSection.ModifyGame || text === GameScreenSection.DeleteGame));

                    return (
                        <button
                            key={index}
                            className={`bg-[#ffefe3] text-lg rounded-[16px] p-2 w-full h-full normal-shadow ${
                                isActive ? "text-[#211f1d] font-bold" : "text-opacity-50 text-[#211f1d]"
                            }`}
                            onClick={() => onButtonClick(text)}
                        >
                            {text}
                        </button>
                    );
                })
            ) : (
                <div>No buttons available</div>
            )}
        </div>
    );
}

export default function GameScreen() {
    const buttonsList = [GameScreenSection.ModifyGame, GameScreenSection.DeleteGame, GameScreenSection.CreateGame];
    const [, setActiveSection] = useState<GameScreenSection>(GameScreenSection.ModifyGame);
    const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined);
    const [games, setGames] = useState<Game[]>([]);
    const [, setLoading] = useState<boolean>(true);

    const allowModify = (user: Game) => {
        setSelectedGame(user);
    };


    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get<Game[]>("http://localhost:3000/Juego");
                setGames(response.data);
            } catch (error) {
                console.error("Error fetching games:", error);
            } finally {
                setLoading(false); // Fin de la carga
            }
        };

        fetchPlayers().then(() => console.log("Games fetched"));
    }, []);

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
            navigate("/game/modify-game", { state: { game: selectedGame } }); // Navegar a la página de modificación
        } else if (section === GameScreenSection.DeleteGame) {
            if (selectedGame) {
                // Mostrar alerta de confirmación antes de eliminar
                const confirmDelete = window.confirm(`Are you sure you want to delete the game ${selectedGame.CodJuego}?`);
                if (confirmDelete) {
                    deleteGame(selectedGame.CodJuego); // Eliminar el equipo
                }
            }
        }

    }

    const deleteGame = async (gameId: string) => {
        try {
            const cleanGameId = gameId.trim();
            const response = await axios.delete(`http://localhost:3000/Juego/${cleanGameId}`);

            console.log(response.data);
            alert("Game deleted successfully");

            // Actualizar la lista de equipos después de la eliminación
            setGames(games.filter((game) => game.CodJuego !== gameId));
            setSelectedGame(undefined); // Limpiar la selección del equipo
        } catch (error) {
            console.error("Error deleting game:", error);
            alert("Error deleting game");
        }
    };



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
        <div id={"app-container"} className={"flex flex-col gap-4 w-full h-full p-0"}>
            <Helmet>
                <title>Game Screen</title>
            </Helmet>

            <header
                className="flex flex-col gap-3 text-white text-inter bg-[#312D2A] rounded-[32px] w-full h-[10%] p-5 text-lg text-extra bold justify-center">
                <h1 className="text-white text-2xl font-bold">Manage Games</h1>
            </header>

            <div className="flex flex-col gap-4 w-full flex-grow">
                <div className="bg-[#312D2A] rounded-[32px] w-full h-[85%] flex grow p-5">
                    <GenericList<Game>
                        data={games}
                        columns={userColumns}
                        rowClassName={rowClassName}
                        className="mx-auto w-full"
                        onRowClick={allowModify}
                        selectedItem={selectedGame}
                    />
                </div>
                <div className="w-full h-[15%] bg-gray bg-[#312d2a] rounded-[32px]">
                    <TextButtons
                        className="flex flex-row gap-5 p-5 w-full h-full"
                        buttons={buttonsList}
                        isGameSelected={!!selectedGame}
                        onButtonClick={(section) => handleButtonClick(section as GameScreenSection)}
                    />
                </div>
            </div>

        </div>

    );
}
