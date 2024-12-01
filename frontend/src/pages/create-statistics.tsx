import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";

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

interface Statictic {
    CodEstadistica: string;
    Descripcion: string;
    Valor: number;
}

interface Game {
    CodJuego: string;
    Descripcion: string;
    Equipo1: string;
    Equipo2: string;
    Fecha: string;
}

export default function CreateStatistic() {
    const [formData, setFormData] = useState({
        CodJugador: "",
        CodJuego: "",
        CodEstadistica: "",
        Cantidad: "",
    });

    const [players, setPlayers] = useState<Player[]>([]);
    const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]); // Jugadores filtrados
    const [games, setGames] = useState<Game[]>([]);
    const [stats, setStats] = useState<Statictic[]>([]);
    const [isPlayerDisabled, setIsPlayerDisabled] = useState<boolean>(true); // Deshabilitar jugadores por defecto
    const [, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Obtener datos de juegos
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get("http://localhost:3000/Juego");
                setGames(response.data);
            } catch (err) {
                console.error("Error fetching games:", err);
                setError("Error fetching games");
            }
        };

        fetchGames();
    }, []);

    // Obtener datos de jugadores
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get<Player[]>("http://localhost:3000/Jugador");
                setPlayers(response.data);
            } catch (error) {
                console.error("Error fetching players:", error);
            }
        };

        fetchPlayers();
    }, []);

    // Obtener datos de estadísticas
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get<Statictic[]>("http://localhost:3000/Estadistica");
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleGameSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedGameId = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            CodJuego: selectedGameId,
        }));

        // Encontrar el juego seleccionado
        const selectedGame = games.find((game) => game.CodJuego === selectedGameId);
        if (selectedGame) {
            // Filtrar jugadores que pertenezcan a los equipos del juego
            const teamPlayers = players.filter(
                (player) =>
                    player.CodEquipo === selectedGame.Equipo1 || player.CodEquipo === selectedGame.Equipo2
            );
            setFilteredPlayers(teamPlayers);
            setIsPlayerDisabled(false); // Habilitar la selección de jugadores
        } else {
            setFilteredPlayers([]);
            setIsPlayerDisabled(true); // Deshabilitar la selección de jugadores
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        if (!formData.CodJugador || !formData.CodJuego || !formData.CodEstadistica || !formData.Cantidad) {
            setError("Please fill all the fields.");
            alert("Please fill all the fields.");
            return;
        }

        // Validar que el jugador seleccionado pertenece al equipo del juego
        const selectedGame = games.find((game) => game.CodJuego === formData.CodJuego);
        const selectedPlayer = players.find((player) => player.CodJugador === formData.CodJugador);

        if (
            !selectedGame ||
            !selectedPlayer ||
            (selectedPlayer.CodEquipo !== selectedGame.Equipo1 &&
                selectedPlayer.CodEquipo !== selectedGame.Equipo2)
        ) {
            alert("The selected player does not belong to the selected game's teams.");
            return;
        }

        try {
            await axios.post("http://localhost:3000/EstadisticaJuego", formData);
            alert("Game Statistic created successfully!");
            navigate("/statistics");
        } catch (error) {
            console.error("Error creating Game Statistic:", error);
            setError("Failed to create Game Statistic.");
        }
    };

    const goBackHandler = () => {
        navigate("/statistics");
    };

    return (
        <div className={"h-full w-full gap-4 flex flex-col"}>
            <div id={"formulario"} className={"flex flex-col bg-[#312d2a] flex-grow gap-5 rounded-[32px] p-5"}>
                <h1 className={"w-full text-xl text-[#F0E0D6] font-bold"}>Game Creation Process</h1>

                <div id={"stat-info"} className={"flex flex-col gap-5"}>
                    <div id={"ids-info"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"game-id"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"game-id"} className={"text-[#F0E0D6] text-lg"}>Game ID</label>
                            <select
                                name={"CodJuego"}
                                value={formData.CodJuego}
                                onChange={handleGameSelect}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                            >
                                <option value="">Select a Game</option>
                                {games.map((game, index) => (
                                    <option className={"text-black"} key={index} value={game.CodJuego}>
                                        {game.Equipo1 + " vs " + game.Equipo2 + " (" + game.CodJuego + ")"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div id={"player-id"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"player-id"} className={"text-[#F0E0D6] text-lg"}>Player ID</label>
                            <select
                                name={"CodJugador"}
                                value={formData.CodJugador}
                                onChange={handleInputChange}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                                disabled={isPlayerDisabled}
                            >
                                <option value="">Select a Player</option>
                                {filteredPlayers.map((player, index) => (
                                    <option className={"text-black"} key={index} value={player.CodJugador}>
                                        {player.Nombre1 + " " + player.Apellido1 + " (" + player.CodJugador + ")"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div id={"statistic-id"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"statistic-id"} className={"text-[#F0E0D6] text-lg"}>Statistic ID</label>
                            <select
                                name={"CodEstadistica"}
                                value={formData.CodEstadistica}
                                onChange={handleInputChange}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                            >
                                <option value="">Select a Statistic</option>
                                {stats.map((stat, index) => (
                                    <option className={"text-black"} key={index} value={stat.CodEstadistica}>
                                        {stat.Descripcion + " - " + stat.Valor}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div id={"cantidad"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"cantidad"} className={"flex flex-col gap-2 w-[32.5%]"}>
                            <label htmlFor={"Cantidad"} className={"text-[#F0E0D6] text-lg"}>Cantidad</label>
                            <input
                                type={"number"}
                                id={"cantidad"}
                                name={"Cantidad"}
                                value={formData.Cantidad}
                                onChange={handleInputChange}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div id={"button-holder"}
                 className={"flex flex-row gap-5 bg-[#312d2a] h-[10%] w-full rounded-[32px] p-5 items-center justify-center"}>
                <div id={"go-back"} className={"flex-1"}>
                    <button onClick={goBackHandler}
                            className={"text-[#F0E0D6] text-1xl font-bold text-opacity-25 w-[100px] h-[50px] hover:text-opacity-100"}>
                        Go Back
                    </button>
                </div>

                <div id={"buttons"} className={"flex-2 items-end justify-center h-full"}>
                    <button onClick={handleSubmit}
                            className={"bg-[#F0E0D6] text-[#201f1d] text-1xl font-bold rounded-2xl w-full min-w-64 h-full normal-shadow"}>
                        Save Game Statistic
                    </button>
                </div>
            </div>
        </div>
    );
}
