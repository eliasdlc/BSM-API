import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ModifyCity() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedTeam = location.state?.city; // Obtener el equipo desde la navegación

    const [formData, setFormData] = useState({
        CodCiudad: "",
        Nombre: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [, setError] = useState<string | null>(null);

    useEffect(() => {
        // Inicializar el formulario con los datos del equipo seleccionado
        if (selectedTeam) {
            setFormData({
                Nombre: selectedTeam.Nombre || "",
                CodCiudad: selectedTeam.CodCiudad || "",
            });
        }
    }, [selectedTeam]);

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
            console.log("formData.CodCiudad", formData.CodCiudad);
            await axios.put(`http://localhost:3000/Ciudad/${formData.CodCiudad}`, formData);
            alert("City updated successfully!");
            navigate("/city");
        } catch (error) {
            console.error("Error updating city:", error);
            setError("Failed to update city.");
            alert("City couldn't be saved due to an error: " + (error));
        } finally {
            setLoading(false);
        }
    };

    const goBackHandler = () => {
        navigate("/city");
    };

    return (
        <div className="h-screen w-full gap-4 flex flex-col p-5">
            <div id="formulario" className="flex flex-col bg-[#312d2a] flex-grow gap-5 rounded-[32px] p-5">
                <h1 className="w-full text-xl text-[#F0E0D6] font-bold">Modify City</h1>

                <div id="game-info" className="flex flex-col gap-5">

                    <div id="city-id" className="flex flex-row gap-5 w-full">
                        <div id="city-id" className="flex flex-col gap-2 w-full">
                            <label htmlFor="city-id" className="text-[#F0E0D6] text-lg">City ID</label>
                            <input
                                type="text"
                                id="city-id"
                                name="CodEquipo"
                                value={formData.CodCiudad}
                                onChange={handleInputChange}
                                className="bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"
                                readOnly={true} // Solo lectura para evitar modificar el ID
                            />
                        </div>

                        <div id="city-name" className="flex flex-col gap-2">
                            <label htmlFor="city-name" className="text-[#F0E0D6] text-lg">City Name</label>
                            <input
                                type="text"
                                id="city-name"
                                name="Nombre"
                                value={formData.Nombre}
                                onChange={handleInputChange}
                                className="bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"
                            />
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
