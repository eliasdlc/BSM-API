import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

interface City {
    CodCiudad: string;
    Nombre: string;
}

export default function ModifyTeam() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedTeam = location.state?.team; // Obtener el equipo desde la navegación

    const [formData, setFormData] = useState({
        CodEquipo: "",
        Nombre: "",
        CodCiudad: "",
    });

    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [, setError] = useState<string | null>(null);

    useEffect(() => {
        // Inicializar el formulario con los datos del equipo seleccionado
        if (selectedTeam) {
            setFormData({
                CodEquipo: selectedTeam.CodEquipo || "",
                Nombre: selectedTeam.Nombre || "",
                CodCiudad: selectedTeam.CodCiudad || "",
            });
        }
    }, [selectedTeam]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get("http://localhost:3000/Ciudad");
                setCities(response.data);
            } catch (err) {
                console.error("Error fetching cities:", err);
                setError("Error fetching cities");
            }
        };

        fetchCities();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.Nombre || !formData.CodCiudad) {
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
            console.log("formData.CodEquipo", formData.CodEquipo);
            await axios.put(`http://localhost:3000/Equipo/${formData.CodEquipo}`, formData);
            alert("Team updated successfully!");
            navigate("/team");
        } catch (error) {
            console.error("Error updating team:", error);
            setError("Failed to update team.");
            alert("Team couldn't be saved due to an error: " + (error));
        } finally {
            setLoading(false);
        }
    };

    const goBackHandler = () => {
        navigate("/team");
    };

    return (
        <div className="h-screen w-full gap-4 flex flex-col p-5">
            <div id="formulario" className="flex flex-col bg-[#312d2a] flex-grow gap-5 rounded-[32px] p-5">
                <h1 className="w-full text-xl text-[#F0E0D6] font-bold">Modify Team</h1>

                <div id="game-info" className="flex flex-col gap-5">
                    <div id="team-id" className="flex flex-row gap-5 w-full">
                        <div id="team-id" className="flex flex-col gap-2 w-full">
                            <label htmlFor="team-id" className="text-[#F0E0D6] text-lg">Team ID</label>
                            <input
                                type="text"
                                id="team-id"
                                name="CodEquipo"
                                value={formData.CodEquipo}
                                onChange={handleInputChange}
                                className="bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"
                                readOnly={true} // Solo lectura para evitar modificar el ID
                            />
                        </div>

                        <div id="city-id" className="flex flex-col gap-2 w-full">
                            <label htmlFor="city-id" className="text-[#F0E0D6] text-lg">City</label>
                            <select
                                name="CodCiudad"
                                value={formData.CodCiudad}
                                onChange={handleInputChange}
                                className="bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"
                            >
                                <option value="">Select a city</option>
                                {cities.map((city, index) => (
                                    <option className="text-black" key={index} value={city.CodCiudad}>
                                        {city.Nombre + " (" + city.CodCiudad + ")"}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div id="team-name" className="flex flex-col gap-2">
                        <label htmlFor="team-name" className="text-[#F0E0D6] text-lg">Team Name</label>
                        <input
                            type="text"
                            id="team-name"
                            name="Nombre"
                            value={formData.Nombre}
                            onChange={handleInputChange}
                            className="bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"
                        />
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
