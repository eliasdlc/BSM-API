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

export default function CreateStatistics(){
    const [formData, setFormData] = useState({
        CodJugador: "",
        CodJuego: "",
        CodEstadistica: "",
        Cantidad: "",
    })

    const [players, setPlayer] = useState<Player[]>([]);
    const [games, setGame] = useState<Game[]>([]);
    const [, setLoading] = useState<boolean>(false); // Estado de carga
    const [, setError] = useState<string | null>(null); // Estado de error
    const [stats, setStat] = useState<Statictic[]>([]);
    const navigate = useNavigate();

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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value } = target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        console.log("Input Value: ", formData);
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
        setLoading(true);

        try {
            await axios.post("http://localhost:3000/EstadisticaJuego", formData);
            alert("Game Statistic created successfully!");
            navigate("/statistic");
        } catch (error) {
            console.error("Error creating Game Statistic:", error);
            setError("Failed to create Game Statistic.");
        } finally {
            setLoading(false);
        }
    }

    const goBackHandler = () => {
        navigate("/statistics");
    }

    return (
        <div className={"h-full w-full gap-4 flex flex-col"}>
            <div id={"formulario"} className={"flex flex-col bg-[#312d2a] flex-grow gap-5 rounded-[32px] p-5"}>
                {/* DONE: Agregar elementos para el form */}
                {/* DONE: Hacer que los inputs se guarden en variables */}
                {/* DONE: Conectar el guardado con la DB */}


                <h1 className={"w-full text-xl text-[#F0E0D6] font-bold"}>Game Creation Process</h1>

                <div id={"stat-info"} className={"flex flex-col gap-5"}>

                    <div id={"ids-info"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"player-id"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"team-id"} className={"text-[#F0E0D6] text-lg"}>Player ID</label>
                            <select
                                name={"CodJugador"}
                                value={formData.CodJugador}
                                onChange={handleInputChange}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                            >
                                <option value="CodJugador">Select a Player</option>
                                {players.map((player, index) => (
                                    <option className={"text-black"} key={index} value={player.CodJugador}>
                                        {player.Nombre1 + " " + player.Apellido1 + " (" + player.CodJugador + ")"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div id={"player-id"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"team-id"} className={"text-[#F0E0D6] text-lg"}>Game ID</label>
                            <select
                                name={"CodJuego"}
                                value={formData.CodJuego}
                                onChange={handleInputChange}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                            >
                                <option value="CodJuego">Select a Game</option>
                                {games.map((team, index) => (
                                    <option className={"text-black"} key={index} value={team.CodJuego}>
                                        {team.Equipo1 + " vs " + team.Equipo2 + " (" + team.CodJuego + ")"}
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

    )
}
