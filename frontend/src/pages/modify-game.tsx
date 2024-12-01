import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

interface Team {
    CodEquipo: string;
    Nombre: string;
    CodCiudad: string;
}

export default function ModifyGame() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedGame = location.state?.game; // Obtener el equipo desde la navegación

    const [formData, setFormData] = useState({
        CodJuego: "",
        Descripcion: "",
        Equipo1: "",
        Equipo2: "",
        Fecha: "",
    });

    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [, setError] = useState<string | null>(null);

    useEffect(() => {
        // Inicializar el formulario con los datos del equipo seleccionado
        if (selectedGame) {
            setFormData({
                CodJuego: selectedGame.CodJuego || "",
                Descripcion: selectedGame.Descripcion || "",
                Equipo1: selectedGame.Equipo1 || "",
                Equipo2: selectedGame.Equipo2 || "",
                Fecha: selectedGame.Fecha || "",
            });
        }
    }, [selectedGame]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get("http://localhost:3000/Equipo");
                setTeams(response.data);
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

        if (!formData.CodJuego || !formData.Descripcion || !formData.Equipo1 || !formData.Equipo2 || !formData.Fecha) {
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
            console.log("formData.CodJuego", formData.CodJuego);
            await axios.put(`http://localhost:3000/Juego/${formData.CodJuego}`, formData);
            alert("Game updated successfully!");
            navigate("/game");
        } catch (error) {
            console.error("Error updating game:", error);
            setError("Failed to update game.");
            alert("Game couldn't be saved due to an error: " + (error));
        } finally {
            setLoading(false);
        }
    };

    const goBackHandler = () => {
        navigate("/game");
    };

    return (
        <div className="h-screen w-full gap-4 flex flex-col p-5">
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
                    {/* TODO: Cuando se renderiza por primera vez no deja ecribir en game-date ni en descripcion */}
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
