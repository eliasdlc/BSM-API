import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

export default function ModifyStatistic() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedStatistic = location.state?.stat;
    console.log("selectedStatistic", selectedStatistic);
    const [loading, setLoading] = useState<boolean>(false);
    const [, setError] = useState<string | null>(null);
    const [players, setPlayer] = useState<Player[]>([]);
    const [, setFilteredPlayers] = useState<Player[]>([]); // Para los jugadores filtrados por equipo
    const [games, setGame] = useState<Game[]>([]);
    const [stats, setStat] = useState<Statictic[]>([]);
    const [isPlayerDisabled, setIsPlayerDisabled] = useState<boolean>(true); // Estado de habilitación del jugador

    const [formData, setFormData] = useState({
        CodJugador: "",
        CodJuego: "",
        CodEstadistica: "",
        Cantidad: "",
    });



    useEffect(() => {
        // Obtener las ciudades
        const fetchGames = async () => {
            try {
                const response = await axios.get("http://localhost:3000/Juego");
                setGame(response.data);
            } catch (err) {
                console.error("Error fetching games:", err);
                setError("Error fetching games");
            }
        };

        fetchGames();
    }, []);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get<Player[]>("http://localhost:3000/Jugador");
                setPlayer(response.data);
            } catch (error) {
                console.error("Error fetching players:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers().then(() => console.log("Player fetched"));
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get<Statictic[]>("http://localhost:3000/Estadistica");
                setStat(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false); // Fin de la carga
            }
        };

        fetchStats()
    }, []);


    const handleGameSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedGame = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            CodJuego: selectedGame,
        }));

        const selectedGameObj = games.find(game => game.CodJuego === selectedGame);
        if (selectedGameObj === undefined) {
            setFilteredPlayers([]);
            setIsPlayerDisabled(true); // Deshabilitar selección de jugador

        } else if (selectedGameObj) {
            // Filtrar jugadores por equipo
            const teamPlayers = players.filter(player => player.CodEquipo === selectedGameObj.Equipo1 || player.CodEquipo === selectedGameObj.Equipo2);
            setFilteredPlayers(teamPlayers);
            setIsPlayerDisabled(false); // Habilitar selección de jugador
        }
    };

    useEffect(() => {
        if (selectedStatistic) {
            setFormData({
                CodJugador: selectedStatistic.CodJugador,
                CodJuego: selectedStatistic.CodJuego,
                CodEstadistica: selectedStatistic.CodEstadistica,
                Cantidad: selectedStatistic.Cantidad,
            });
        }
    }, [selectedStatistic]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (Object.values(formData).some((field) => !field)) {
            alert("Please fill all the required fields.");
            return;
        }

        if (!window.confirm("Are you sure you want to save these changes?")) {
            return;
        }

        setLoading(true);
        setError(null); // Limpiar el error antes de intentar la solicitud

        try {
            console.log("formData", formData);
            console.log("formData.CodEstadistica", formData.CodEstadistica);
            console.log("formData.CodJugador", formData.CodJugador);
            console.log("formData.CodJuego", formData.CodJuego);
            await axios.put(`http://localhost:3000/EstadisticaJuego/${formData.CodEstadistica}/${formData.CodJugador}/${formData.CodJuego}`, formData);
            alert("Statistic updated successfully!");
            navigate("/statistics");
        } catch (error) {
            console.error("Error updating statistic:", error);
            setError("Failed to update statistic.");
            alert("Statistic couldn't be saved due to an error: " + (error));
        } finally {
            setLoading(false);
        }
    };

    const goBackHandler = () => {
        navigate("/statistics");
    };

    return (
        <div className="h-screen w-full gap-4 flex flex-col p-5">
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
                                <option value="CodJuego">Select a Game</option>
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
                                <option value="CodJugador">Select a Player</option>
                                {players.map((player, index) => (
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
                                <option value="CodEstadistica">Select a Statistic</option>
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
                            <input type={"number"} id={"cantidad"} name={"Cantidad"} value={formData.Cantidad}
                                   onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                    </div>


                </div>

            </div>

            <div id="button-holder"
                 className="flex flex-row gap-5 bg-[#312d2a] h-[10%] w-full rounded-[32px] p-5 items-center justify-center">
                <div id="go-back" className="flex-1">
                    <button onClick={goBackHandler}
                            className="text-[#F0E0D6] text-1xl font-bold text-opacity-25 w-[100px] h-[50px] hover:text-opacity-100">
                        Go Back
                    </button>
                </div>

                <div id="buttons" className="flex-2 items-end justify-center h-full">
                    <button onClick={handleSubmit}
                            className="bg-[#F0E0D6] text-[#201f1d] text-1xl font-bold rounded-2xl w-full min-w-64 h-full normal-shadow"
                            disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}
