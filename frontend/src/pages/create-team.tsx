import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

interface City {
    CodCiudad: string;
    Nombre: string;
}

export default function CreateTeam() {
    const [formData, setFormData] = useState({
        CodEquipo: "",
        Nombre: "",
        CodCiudad: "",
    });

    const [cities, setCities] = useState<City[]>([]); // Para guardar las ciudades obtenidas
    const [, setLoading] = useState<boolean>(false); // Estado de carga
    const [, setError] = useState<string | null>(null); // Estado de error
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
        const fetchAllTeamsAndSetNextId = async () => {
            try {
                // Obtener todos los equipos
                const response = await axios.get('http://localhost:3000/Equipo');
                const teams = response.data; // Asumiendo que la respuesta es un array de equipos

                if (teams.length > 0) {
                    // Obtener el último equipo
                    const lastTeam = teams[teams.length - 1];
                    const lastTeamId = lastTeam.CodEquipo;

                    // Incrementar el ID
                    const nextIdNum = parseInt(lastTeamId, 10) + 1;
                    const nextId = nextIdNum.toString().padStart(4, '0'); // Asegurarse de que tenga 4 dígitos

                    // Asignar el siguiente ID al estado
                    setFormData((prevData) => ({
                        ...prevData,
                        CodEquipo: nextId
                    }));
                } else {
                    // Si no hay equipos, iniciar con el primer ID
                    setFormData((prevData) => ({
                        ...prevData,
                        CodEquipo: '0001'
                    }));
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchAllTeamsAndSetNextId();
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
            await axios.post("http://localhost:3000/Equipo", formData);
            alert("Team created successfully!");
            navigate("/team"); // Redirigir a la lista de equipos
        } catch (error) {
            console.error("Error creating team:", error);
            setError("Failed to create team.");
        } finally {
            setLoading(false);
        }
    };

    const goBackHandler = () => {
        navigate("/team");
    };

    return (
        <div className={"h-full w-full gap-4 flex flex-col"}>
            <div id={"formulario"} className={"flex flex-col bg-[#312d2a] flex-grow gap-5 rounded-[32px] p-5"}>
                <h1 className={"w-full text-xl text-[#F0E0D6] font-bold"}>Team Creation Process</h1>

                <div id={"game-info"} className={"flex flex-col gap-5"}>
                    <div id={"team-id"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"team-id"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"team-id"} className={"text-[#F0E0D6] text-lg"}>Team ID</label>
                            <input
                                type={"text"}
                                id={"team-id"}
                                name={"CodEquipo"}
                                value={formData.CodEquipo} // Asegurarse de que CodEquipo tiene el valor formateado
                                onChange={handleInputChange}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                                readOnly={true}
                            />
                        </div>

                        <div id={"city-id"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"city-id"} className={"text-[#F0E0D6] text-lg"}>City</label>
                            <select
                                name={"CodCiudad"}
                                value={formData.CodCiudad}
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
                    </div>

                    <div id={"team-name"} className={"flex flex-col gap-2"}>
                        <label htmlFor={"team-name"} className={"text-[#F0E0D6] text-lg"}>Team Name</label>
                        <input
                            type={"text"}
                            id={"team-name"}
                            name={"Nombre"}
                            value={formData.Nombre}
                            onChange={handleInputChange}
                            className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                        />
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
                        Save Team
                    </button>
                </div>
            </div>
        </div>
    );
}
