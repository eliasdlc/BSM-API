import {useEffect, useState} from "react";
import { ListColumnConfig } from "../types/types.ts";
import { GenericList } from "../components/List";
import {useNavigate} from "react-router-dom";
import axios from "axios";


enum StatsScreenSection {
    ModifyStats = "Modify Game Statistics (Select an element)",
    DeleteStats = "Delete Game Statistics",
    CreateStats = "Create Game Statistics",
}

interface GameStatistics {
    CodJugador: string;
    CodJuego: string;
    CodEstadistica: string;
    Cantidad: string;
}

function TextButtons({
                         buttons,
                         isStatSelected,
                         onButtonClick,
                         className,
                     }: {
    buttons: string[];
    isStatSelected: boolean;
    onButtonClick: (button: string) => void;
    className?: string;
}) {
    return (
        <div className={className}>
            {buttons && buttons.length > 0 ? (
                buttons.map((text, index) => {
                    const isActive =
                        (text === StatsScreenSection.CreateStats && !isStatSelected) ||
                        (isStatSelected && (text === StatsScreenSection.ModifyStats || text === StatsScreenSection.DeleteStats));

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

export default function StatisticsScreen() {
    const buttonsList = [
        StatsScreenSection.ModifyStats,
        StatsScreenSection.DeleteStats,
        StatsScreenSection.CreateStats,
    ];
    const [, setActiveSection] = useState<StatsScreenSection>(
        StatsScreenSection.ModifyStats
    );
    const [selectedStat, setSelectedStat] = useState<GameStatistics | undefined>(
        undefined
    );

    const [stats, setStats] = useState<GameStatistics[]>([]);
    const [, setLoading] = useState<boolean>(true); // Manejo del estado de carga

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get<GameStatistics[]>("http://localhost:3000/EstadisticaJuego");
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false); // Fin de la carga
            }
        };

        fetchStats().then(() => console.log("Stats fetched"));
    }, []);

    const allowModify = (stat: GameStatistics) => {
        console.log("Selected stat:", stat);
        setSelectedStat(stat);
    };

    const navigate = useNavigate();

    const handleButtonClick = (section: string) => {
        setActiveSection(section as StatsScreenSection);

        if (section === StatsScreenSection.CreateStats) {
            try {
                navigate("/statistics/create-statistics");
            } catch (error) {
                console.error("Error al navegar:", error);
            }
        } else if (section === StatsScreenSection.ModifyStats) {
            console.log("Selected stat:", selectedStat);
            navigate("/statistics/modify-statistics", { state: { stat: selectedStat } }); // Navegar a la página de modificación
        } else if (section === StatsScreenSection.DeleteStats) {
            if (selectedStat){
                const confirmDelete = window.confirm("Are you sure you want to delete this player?");
                if (confirmDelete) {
                    deleteStat(selectedStat.CodJugador, selectedStat.CodJuego, selectedStat.CodEstadistica); // Eliminar el equipo
                }
            }
        }
    };

    const deleteStat = async (playerId: string, gameId: string, statId: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/EstadisticaJuego/${statId}/${playerId}/${gameId}`);
            console.log(response.data);
            alert("Game Statistic deleted successfully");

            // Actualizar la lista de equipos después de la eliminación
            setStats(stats.filter((stats) => stats.CodJugador !== playerId && stats.CodJuego !== gameId && stats.CodEstadistica !== statId));
            setSelectedStat(undefined); // Limpiar la selección del equipo
        } catch (error) {
            console.error("Error deleting stat:", error);
            alert("Error deleting Statistic");
        }
    };

    const statsColumns: ListColumnConfig<GameStatistics>[] = [
        {
            key: "CodJugador",
            header: "Player ID",
            render: (value: string | number): JSX.Element => (
                <span className="font-bold text-[#F5672D]">#{value}</span>
            ),
        },
        { key: "CodJuego", header: "Game ID",
            render: (value: string | number): JSX.Element => (
                <span className="font-bold text-[#F5672D]">#{value}</span>
            ),},
        { key: "CodEstadistica", header: "Statistic ID",
            render: (value: string | number): JSX.Element => (
                <span className="font-bold text-[#F5672D]">#{value}</span>
            ),},
        { key: "Cantidad", header: "Amount"},
    ];

    const rowClassName = (_item: GameStatistics, index: number, isSelected?: boolean) =>
        isSelected
            ? "bg-[#F5672D] text-white"
            : index % 2 === 0
                ? "bg-[#F0E0D6]"
                : "bg-[#ffefe3]";

    return (
        <div className="flex flex-col gap-4 w-full h-full p-0">
            <header className="flex flex-col gap-3 text-white bg-[#312D2A] rounded-[32px] w-full h-[10%] p-5 text-lg font-bold justify-center">
                <h1 className="text-white text-2xl font-bold">Manage Game Statistics</h1>
            </header>

            <div className="flex flex-col gap-4 w-full flex-grow">

                <div className="bg-[#312D2A] rounded-[32px] w-full h-[85%] flex grow p-5">
                    <GenericList<GameStatistics>
                        data={stats}
                        columns={statsColumns}
                        rowClassName={rowClassName}
                        className="mx-auto w-full"
                        onRowClick={allowModify}
                        selectedItem={selectedStat}
                    />
                </div>

                <div className="w-full h-[15%] bg-[#312d2a] rounded-[32px]">
                    <TextButtons
                        className="flex flex-row gap-5 p-5 w-full h-full"
                        buttons={buttonsList}
                        isStatSelected={!!selectedStat}
                        onButtonClick={(section) =>
                            handleButtonClick(section as StatsScreenSection)
                        }
                    />
                </div>
            </div>
        </div>
    );
}
