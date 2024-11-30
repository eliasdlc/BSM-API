import {useState, FormEvent, useEffect, ChangeEvent} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

interface Team {
    CodEquipo: string;
    Nombre: string;
    CodCiudad: string;
}

export default function CreateGame() {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        CodJuego: "",
        Equipo1: "",
        Equipo2: "",
        Fecha: "",
        Descripcion: ""
    });

    const [teams, setTeams] = useState<Team[]>([]);
    const [, setError] = useState<string | null>(null); // Estado de error
    const [, setLoading] = useState<boolean>(true);

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

    useEffect(() => {
        const fetchAllGamesAndSetNextId = async () => {
            try {
                // Obtener todos los equipos
                const response = await axios.get('http://localhost:3000/Juego');
                const games = response.data; // Asumiendo que la respuesta es un array de equipos

                if (games.length > 0) {
                    // Obtener el último equipo
                    const lastGames = games[games.length - 1];
                    const lastGameId = lastGames.CodJuego;

                    // Incrementar el ID
                    const nextIdNum = parseInt(lastGameId, 10) + 1;
                    const nextId = nextIdNum.toString().padStart(4, '0'); // Asegurarse de que tenga 4 dígitos

                    // Asignar el siguiente ID al estado
                    setFormData((prevData) => ({
                        ...prevData,
                        CodJuego: nextId
                    }));
                } else {
                    // Si no hay equipos, iniciar con el primer ID
                    setFormData((prevData) => ({
                        ...prevData,
                        CodJuego: '0001'
                    }));
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchAllGamesAndSetNextId();
    }, []);

    // Manejar el cambio en los inputs
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e: FormEvent) => {
        console.log("Form Data:", formData);
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
        setLoading(true);

        if ( formData.Equipo1 != formData.Equipo2 ) {
            try {
                // Hacer la solicitud para guardar el equipo
                await axios.post("http://localhost:3000/Juego", formData);
                alert("Juego created successfully!");
                navigate("/game"); // Redirigir a la lista de equipos
            } catch (error) {
                console.error("Error creating game:", error);
                setError("Failed to create game.");
            } finally {
                setLoading(false);
            }
        } else {
            alert("The teams must be different!");
        }


    };

    const navigate = useNavigate();


    // Manejar el retorno al Game Screen
    const goBackHandler = () => {
        console.log("Go back to game screen");
        navigate("/game");
    };

    return (
        <div className={"h-screen w-full gap-4 flex flex-col p-5"}>
            <div
                id={"formulario"}
                className={"flex flex-col bg-[#312d2a] flex-grow gap-5 rounded-[32px] p-5"}
            >
                <h1 className={"w-full text-xl text-[#F0E0D6] font-bold"}>
                    Game Creation Process
                </h1>

                <div id={"game-info"} className={"flex flex-col gap-5"}>
                    <div id={"team-names"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"game-id"} className={"flex flex-col gap-2 w-[50%]"}>
                            <label htmlFor={"game-id"} className={"text-[#F0E0D6] text-lg"}>Game ID</label>
                            <input
                                type={"text"}
                                id={"game-id"}
                                name={"CodJuego"}
                                value={formData.CodJuego} // Asegurarse de que CodEquipo tiene el valor formateado
                                onChange={handleInputChange}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                                readOnly={true}
                            />
                        </div>
                        <div id={"local-team"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"local-team"} className={"text-[#F0E0D6] text-lg"}>
                                Local Team Name
                            </label>
                            <select
                                name={"Equipo1"}
                                value={formData.Equipo1}
                                onChange={handleInputChange}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                            >
                                <option value="">Select a city</option>
                                {teams.map((team, index) => (
                                    <option className={"text-black"} key={index} value={team.CodEquipo}>
                                        {team.Nombre + " (" + team.CodEquipo + ")"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div id={"visitor-team"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"visitor-team"} className={"text-[#F0E0D6] text-lg"}>
                                Visitor Team Name
                            </label>
                            <select
                                name={"Equipo2"}
                                value={formData.Equipo2}
                                onChange={handleInputChange}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                            >
                                <option value="">Select a city</option>
                                {teams.map((team, index) => (
                                    <option className={"text-black"} key={index} value={team.CodEquipo}>
                                        {team.Nombre + " (" + team.CodEquipo + ")"}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div id={"game-date"} className={"flex flex-col gap-2"}>
                        <label htmlFor={"game-date"} className={"text-[#F0E0D6] text-lg"}>
                            Game Date
                        </label>
                        <input
                            type={"date"}
                            id={"game-date"}
                            name={"Fecha"} // Cambié el nombre para que coincida con el estado
                            value={formData.Fecha} // Usamos el valor del estado
                            onChange={handleInputChange}
                            className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                        />
                    </div>

                    <div id={"game-description"} className={"flex flex-col gap-2"}>
                        <label htmlFor={"game-description"} className={"text-[#F0E0D6] text-lg"}>
                            Game Description
                        </label>
                        <input
                            type={"text"}
                            id={"game-description"}
                            name={"Descripcion"} // Cambié el nombre para que coincida con el estado
                            value={formData.Descripcion} // Usamos el valor del estado
                            onChange={handleInputChange}
                            className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full h-[150px] normal-shadow"}
                        />
                    </div>
                </div>
            </div>

            <div
                id={"button-holder"}
                className={"flex flex-row gap-5 bg-[#312d2a] h-[10%] w-full rounded-[32px] p-5 items-center justify-center"}
            >
                <div id={"go-back"} className={"flex-1"}>
                    <button
                        onClick={goBackHandler}
                        className={"text-[#F0E0D6] text-1xl font-bold text-opacity-25 w-[100px] h-[50px] hover:text-opacity-100"}
                    >
                        Go Back
                    </button>
                </div>

                <div id={"buttons"} className={"flex-2 items-end justify-center h-full"}>
                    <button
                        onClick={handleSubmit}
                        className={"bg-[#F0E0D6] text-[#201f1d] text-1xl font-bold rounded-2xl w-full min-w-64 h-full normal-shadow"}
                    >
                        Save Game
                    </button>
                </div>
            </div>
        </div>
    );
}
