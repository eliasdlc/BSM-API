import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";

interface City {
    CodCiudad: string;
    Nombre: string;
}

interface Team {
    CodEquipo: string;
    Nombre: string;
    CodCiudad: string;
}

export default function CreatePlayer(){
    const [formData, setFormData] = useState({
        CodJugador: "",
        CodEquipo: "",
        Numero: "",
        Nombre1: "",
        Nombre2: "",
        Apellido1: "",
        Apellido2: "",
        CiudadNacim: "",
        FechaNacim: ""
    })

    const [cities, setCities] = useState<City[]>([]); // Para guardar las ciudades obtenidas
    const [, setLoading] = useState<boolean>(false); // Estado de carga
    const [, setError] = useState<string | null>(null); // Estado de error
    const [teams, setTeams] = useState<Team[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener las ciudades
        const fetchCities = async () => {
            try {
                const response = await axios.get("http://localhost:3000/Ciudad");
                setCities(response.data); // Asume que la respuesta es un array de objetos City
            } catch (err) {
                console.error("Error fetching cities:", err);
                setError("Error fetching cities");
            }
        };

        fetchCities();
    }, []);

    useEffect(() => {
        const fetchAllPlayersAndSetNextId = async () => {
            try {
                // Obtener todos los equipos
                const response = await axios.get('http://localhost:3000/Jugador');
                const players = response.data; // Asumiendo que la respuesta es un array de equipos

                if (players.length > 0) {
                    // Obtener el último equipo
                    const lastPlayer = players[players.length - 1];
                    const lastPlayerId = lastPlayer.CodJugador;

                    // Incrementar el ID
                    const nextIdNum = parseInt(lastPlayerId, 10) + 1;
                    const nextId = nextIdNum.toString().padStart(4, '0'); // Asegurarse de que tenga 4 dígitos

                    // Asignar el siguiente ID al estado
                    setFormData((prevData) => ({
                        ...prevData,
                        CodJugador: nextId
                    }));
                } else {
                    // Si no hay equipos, iniciar con el primer ID
                    setFormData((prevData) => ({
                        ...prevData,
                        CodJugador: '0001'
                    }));
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchAllPlayersAndSetNextId();
    }, []);

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

        fetchTeams().then(() => console.log("Player fetched"));
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
            // Hacer la solicitud para guardar el equipo
            await axios.post("http://localhost:3000/Jugador", formData);
            alert("Player created successfully!");
            navigate("/player"); // Redirigir a la lista de equipos
        } catch (error) {
            console.error("Error creating player:", error);
            setError("Failed to create player.");
        } finally {
            setLoading(false);
        }
    }

    const goBackHandler = () => {
        navigate("/player");
    }

    return (
        <div className={"h-screen w-full gap-4 flex flex-col p-5"}>
            <div id={"formulario"} className={"flex flex-col bg-[#312d2a] flex-grow gap-5 rounded-[32px] p-5"}>
                {/* DONE: Agregar elementos elementos para el form */}
                {/* DONE: Hacer que los inputs se guarden en variables */}
                {/* TODO: Conectar el guardado con la DB */}


                <h1 className={"w-full text-xl text-[#F0E0D6] font-bold"}>Game Creation Process</h1>

                <div id={"game-info"} className={"flex flex-col gap-5"}>

                    <div id={"primary-player-info"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"player-id"} className={"flex flex-col gap-2 w-[25%]"}>
                            <label htmlFor={"player-id"} className={"text-[#F0E0D6] text-lg"}>Player ID</label>
                            <input type={"text"} id={"player-id"} name={"CodJugador"} value={formData.CodJugador} onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                                   readOnly={true}/>
                        </div>

                        <div id={"team-id"} className={"flex flex-col gap-2 w-[25%]"}>
                            <label htmlFor={"team-id"} className={"text-[#F0E0D6] text-lg"}>Team ID</label>
                            <select
                                name={"CodEquipo"}
                                value={formData.CodEquipo}
                                onChange={handleInputChange}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                            >
                                <option value="">Select a Team</option>
                                {teams.map((team, index) => (
                                    <option className={"text-black"} key={index} value={team.CodEquipo}>
                                        {team.Nombre + " (" + team.CodEquipo + ")"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div id={"number"} className={"flex flex-col gap-2 w-[50%]"}>
                            <label htmlFor={"number"} className={"text-[#F0E0D6] text-lg"}>Number</label>
                            <input type={"number"} id={"number"} name={"Numero"} value={formData.Numero}
                                   onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                    </div>

                    <div id={"player-names"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"name1"} className={"flex flex-col gap-2 w-[25%]"}>
                            <label htmlFor={"name1"} className={"text-[#F0E0D6] text-lg"}>First Name</label>
                            <input type={"text"} id={"name1"} name={"Nombre1"} value={formData.Nombre1}  onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                        <div id={"name2"} className={"flex flex-col gap-2 w-[25%]"}>
                            <label htmlFor={"name2"} className={"text-[#F0E0D6] text-lg"}>Second Name</label>
                            <input type={"text"} id={"name2"} name={"Nombre2"} value={formData.Nombre2} onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                        <div id={"lastname1"} className={"flex flex-col gap-2 w-[25%]"}>
                            <label htmlFor={"lastname1"} className={"text-[#F0E0D6] text-lg"}>First Lastname</label>
                            <input type={"text"} id={"lastname1"} name={"Apellido1"} value={formData.Apellido1}  onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                        <div id={"lastname2"} className={"flex flex-col gap-2 w-[25%]"}>
                            <label htmlFor={"lastname2"} className={"text-[#F0E0D6] text-lg"}>Second Lastname</label>
                            <input type={"text"} id={"lastname2"} name={"Apellido2"} value={formData.Apellido2}  onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>
                    </div>


                    <div id={"secondary-player-info"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"city-born"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"city-born"} className={"text-[#F0E0D6] text-lg"}>City of Birth</label>
                            <select
                                name={"CiudadNacim"}
                                value={formData.CiudadNacim}
                                onChange={handleInputChange}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                            >
                                <option value="">Select a city</option>
                                {cities.map((city, index) => (
                                    <option className={"text-black"} key={index} value={city.CodCiudad}>
                                        {city.Nombre + " (" + city.CodCiudad + ")"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div id={"year-born"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"year-born"} className={"text-[#F0E0D6] text-lg"}>Year of Birth</label>
                            <input type={"date"} id={"year-born"} name={"FechaNacim"} value={formData.FechaNacim}
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
                        Save Game
                    </button>
                </div>
            </div>
        </div>

    )
}
