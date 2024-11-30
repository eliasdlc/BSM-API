import { useEffect, useState } from "react";
import { ListColumnConfig } from "../types/types.ts";
import { GenericList } from "../components/List";
import { useNavigate } from "react-router-dom";
import axios from "axios";

enum TeamScreenSection {
    ModifyTeam = "Modify Team (Select an element)",
    DeleteTeam = "Delete Team",
    CreateTeam = "Create Team"
}

interface Team {
    CodEquipo: string;
    Nombre: string;
    CodCiudad: string;
}

function TextButtons({
                         buttons,
                         onButtonClick,
                         className,
                         isTeamSelected,
                     }: {
    buttons: string[],
    onButtonClick: (button: string) => void,
    className?: string,
    isTeamSelected: boolean,
}) {
    return (
        <div className={className}>
            {buttons && buttons.length > 0 ? (
                buttons.map((text, index) => {
                    // Determinamos si un botón debe estar activo
                    const isActive =
                        (text === TeamScreenSection.CreateTeam && !isTeamSelected) ||
                        (isTeamSelected && (text === TeamScreenSection.ModifyTeam || text === TeamScreenSection.DeleteTeam));

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


export default function TeamScreen() {
    const buttonsList = [TeamScreenSection.ModifyTeam, TeamScreenSection.DeleteTeam, TeamScreenSection.CreateTeam];
    const [, setActiveSection] = useState<TeamScreenSection>(TeamScreenSection.CreateTeam);
    const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(undefined);

    const [teams, setTeams] = useState<Team[]>([]);
    const [, setLoading] = useState<boolean>(true); // Manejo del estado de carga

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get<Team[]>("http://localhost:3000/Equipo");
                setTeams(response.data);
            } catch (error) {
                console.error("Error fetching players:", error);
            } finally {
                setLoading(false); // Fin de la carga
            }
        };

        fetchTeams().then(() => console.log("Teams fetched"));
    }, []);

    const allowModify = (team: Team) => {
        console.log('Selected team:', team);
        setSelectedTeam(team);
    };

    const navigate = useNavigate();

    const handleButtonClick = (section: string) => {
        setActiveSection(section as TeamScreenSection);

        if (section === TeamScreenSection.CreateTeam) {
            try {
                navigate("/team/create-team");
            } catch (error) {
                console.error("Error al navegar:", error);
            }
        } else if (section === TeamScreenSection.ModifyTeam) {
            // Navegar a la página de modificación (esto es un ejemplo)
            navigate("/team/modify-team", { state: { team: selectedTeam } });
        } else if (section === TeamScreenSection.DeleteTeam) {
            if (selectedTeam) {
                // Mostrar alerta de confirmación antes de eliminar
                const confirmDelete = window.confirm(`Are you sure you want to delete the team ${selectedTeam.Nombre}?`);
                if (confirmDelete) {
                    deleteTeam(selectedTeam.CodEquipo); // Eliminar el equipo
                }
            }
        }
    };

    const deleteTeam = async (teamId: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/Equipo/${teamId}`);
            console.log(response.data);
            alert("Team deleted successfully");

            // Actualizar la lista de equipos después de la eliminación
            setTeams(teams.filter((team) => team.CodEquipo !== teamId));
            setSelectedTeam(undefined); // Limpiar la selección del equipo
        } catch (error) {
            console.error("Error deleting team:", error);
            alert("Error deleting team");
        }
    };


    const teamColumns: ListColumnConfig<Team>[] = [
        {
            key: 'CodEquipo',
            header: 'ID',
            render: (value: string | number): JSX.Element =>
                (<span className="font-bold text-[#F5672D]">#{value}</span>),
        },
        {
            key: 'Nombre',
            header: 'Team Name',
        },
        {
            key: 'CodCiudad',
            header: 'City',
        },
    ];

    const rowClassName = (_item: Team, index: number, isSelected?: boolean) =>
        isSelected ? 'bg-[#F5672D] text-white' : (index % 2 === 0 ? 'bg-[#F0E0D6]' : 'bg-[#ffefe3]');

    return (
        <div id="app-container" className="flex flex-col gap-4 w-full h-full p-0">
            <header
                className="flex flex-col gap-3 text-white text-inter bg-[#312D2A] rounded-[32px] w-full h-[10%] p-5 text-lg text-extra bold justify-center">
                <h1 className="text-white text-2xl font-bold">Manage Teams</h1>
            </header>

            <div className="flex flex-col gap-4 w-full flex-grow">
                <div className="bg-[#312D2A] rounded-[32px] w-full h-[85%] flex grow p-5">
                    <GenericList<Team>
                        data={teams}
                        columns={teamColumns}
                        rowClassName={rowClassName}
                        className="mx-auto w-full"
                        onRowClick={allowModify}
                        selectedItem={selectedTeam}
                    />
                </div>
                <div className="w-full h-[15%] bg-gray bg-[#312d2a] rounded-[32px] ">
                    <TextButtons
                        className="flex flex-row gap-5 p-5 w-full h-full"
                        buttons={buttonsList}
                        isTeamSelected={!!selectedTeam}
                        onButtonClick={(section) => handleButtonClick(section as TeamScreenSection)} />
                </div>
            </div>
        </div>
    );
}
