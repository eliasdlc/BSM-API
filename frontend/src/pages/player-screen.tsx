import {useEffect, useState} from "react";
import { ListColumnConfig } from "../types/types.ts";
import { GenericList } from "../components/List";
import {useNavigate} from "react-router-dom";
import axios from "axios";


enum PlayerScreenSection {
    ModifyPlayer = "Modify Player (Select an element)",
    DeletePlayer = "Delete Player",
    CreatePlayer = "Create Player",
}

interface Player {
    CodJugador: string;
    Nombre1: string;
    Nombre2: string;
    Apellido1: string;
    Apellido2: string;
    CiudadNacim: string;
    FechaNacim: string;
    Numero: number;
    CodEquipo: string;
}

function TextButtons({
                         buttons,
                         isPlayerSelected,
                         onButtonClick,
                         className,
                     }: {
    buttons: string[];
    isPlayerSelected: boolean;
    onButtonClick: (button: string) => void;
    className?: string;
}) {
    return (
        <div className={className}>
            {buttons && buttons.length > 0 ? (
                buttons.map((text, index) => {
                        const isActive =
                            (text === PlayerScreenSection.CreatePlayer && !isPlayerSelected) ||
                            (isPlayerSelected && (text === PlayerScreenSection.ModifyPlayer || text === PlayerScreenSection.DeletePlayer));

                        return(
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

export default function PlayerScreen() {
    const buttonsList = [
        PlayerScreenSection.ModifyPlayer,
        PlayerScreenSection.DeletePlayer,
        PlayerScreenSection.CreatePlayer,
    ];
    const [, setActiveSection] = useState<PlayerScreenSection>(
        PlayerScreenSection.ModifyPlayer
    );
    const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(
        undefined
    );

    const [players, setPlayers] = useState<Player[]>([]);
    const [, setLoading] = useState<boolean>(true); // Manejo del estado de carga

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get<Player[]>("http://localhost:3000/Jugador");
                setPlayers(response.data);
            } catch (error) {
                console.error("Error fetching players:", error);
            } finally {
                setLoading(false); // Fin de la carga
            }
        };

        fetchPlayers().then(() => console.log("Players fetched"));
    }, []);

    const allowModify = (user: Player) => {
        console.log("Selected user:", user);
        setSelectedPlayer(user);
    };

    const navigate = useNavigate();

    const handleButtonClick = (section: string) => {
        setActiveSection(section as PlayerScreenSection);

        if (section === PlayerScreenSection.CreatePlayer) {
            try {
                navigate("/player/create-player");
            } catch (error) {
                console.error("Error al navegar:", error);
            }
        } else if (section === PlayerScreenSection.ModifyPlayer) {
            //navigate("/modify-game"); // Navegar a la página de modificación
        } else if (section === PlayerScreenSection.DeletePlayer) {
            if (selectedPlayer){
                const confirmDelete = window.confirm("Are you sure you want to delete this player?");
                if (confirmDelete) {
                    deletePlayer(selectedPlayer.CodJugador); // Eliminar el equipo
                }
            }
        }
    };

    const deletePlayer = async (playerId: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/Jugador/${playerId}`);
            console.log(response.data);
            alert("Team deleted successfully");

            // Actualizar la lista de equipos después de la eliminación
            setPlayers(players.filter((players) => players.CodJugador !== playerId));
            setSelectedPlayer(undefined); // Limpiar la selección del equipo
        } catch (error) {
            console.error("Error deleting team:", error);
            alert("Error deleting team");
        }
    };

    const userColumns: ListColumnConfig<Player>[] = [
        {
            key: "CodJugador",
            header: "ID",
            render: (value: string | number): JSX.Element => (
                <span className="font-bold text-[#F5672D]">#{value}</span>
            ),
        },
        { key: "Nombre1", header: "First Name" },
        { key: "Nombre2", header: "Second Name" },
        { key: "Apellido1", header: "First Last Name" },
        { key: "Apellido2", header: "Second Last Name"},
        { key: "CiudadNacim", header: "City of Birth" },
        { key: "FechaNacim", header: "Year of Birth" },
        { key: "Numero", header: "Number" },
        { key: "CodEquipo", header: "Team ID" },
    ];

    const rowClassName = (_item: Player, index: number, isSelected?: boolean) =>
        isSelected
            ? "bg-[#F5672D] text-white"
            : index % 2 === 0
                ? "bg-[#F0E0D6]"
                : "bg-[#ffefe3]";

    return (
        <div className="flex flex-col gap-4 w-full h-full p-0">
            <header className="flex flex-col gap-3 text-white bg-[#312D2A] rounded-[32px] w-full h-[10%] p-5 text-lg font-bold justify-center">
                <h1 className="text-white text-2xl font-bold">Manage Players</h1>
            </header>

            <div className="flex flex-col gap-4 w-full flex-grow">

                <div className="bg-[#312D2A] rounded-[32px] w-full h-[85%] flex grow p-5">
                    <GenericList<Player>
                        data={players}
                        columns={userColumns}
                        rowClassName={rowClassName}
                        className="mx-auto w-full"
                        onRowClick={allowModify}
                        selectedItem={selectedPlayer}
                    />
                </div>

                <div className="w-full h-[15%] bg-[#312d2a] rounded-[32px]">
                    <TextButtons
                        className="flex flex-row gap-5 p-5 w-full h-full"
                        buttons={buttonsList}
                        isPlayerSelected={!!selectedPlayer}
                        onButtonClick={(section) =>
                            handleButtonClick(section as PlayerScreenSection)
                        }
                    />
                </div>
            </div>
        </div>
    );
}
