import {useState, FormEvent, ChangeEvent} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


export default function CreateCity() {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        CodCiudad: "",
        Nombre: "",
    });

    const [, setError] = useState<string | null>(null); // Estado de error
    const [, setLoading] = useState<boolean>(true);

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

        //TODO: Validar que se coloque cuatro o menos caracteres en el id y que sean mayusculas

        if (!formData.CodCiudad || !formData.Nombre) {
            setError("Please fill all the fields.");
            alert("Please fill all the fields.");
            setLoading(false);
        } else {
            try {
                // Hacer la solicitud para guardar el equipo
                await axios.post("http://localhost:3000/Ciudad", formData);
                alert("Juego created successfully!");
                navigate("/city"); // Redirigir a la lista de equipos
            } catch (error) {
                console.error("Error creating city:", error);
                setError("Failed to create city.");
            } finally {
                setLoading(false);
            }
        }


    };

    const navigate = useNavigate();


    // Manejar el retorno al City Screen
    const goBackHandler = () => {
        console.log("Go back to city screen");
        navigate("/city");
    };

    return (
        <div className={"h-full w-full gap-4 flex flex-col"}>
            <div
                id={"formulario"}
                className={"flex flex-col bg-[#312d2a] flex-grow gap-5 rounded-[32px] p-5"}
            >
                <h1 className={"w-full text-xl text-[#F0E0D6] font-bold"}>
                    City Creation Process
                </h1>

                <div id={"city-info"} className={"flex flex-col gap-5"}>
                    <div id={"city-names"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"city-id"} className={"flex flex-col gap-2 w-[25%]"}>
                            <label htmlFor={"city-id"} className={"text-[#F0E0D6] text-lg"}>City ID</label>
                            <input
                                type={"text"}
                                id={"city-id"}
                                name={"CodCiudad"}
                                value={formData.CodCiudad} // Asegurarse de que CodEquipo tiene el valor formateado
                                onChange={handleInputChange}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                            />
                        </div>

                        <div id={"city-name"} className={"flex flex-col w-full gap-2"}>
                            <label htmlFor={"city-name"} className={"text-[#F0E0D6] text-lg"}>
                                City Name
                            </label>
                            <input
                                type={"text"}
                                id={"city-name"}
                                name={"Nombre"} // Cambié el nombre para que coincida con el estado
                                value={formData.Nombre} // Usamos el valor del estado
                                onChange={handleInputChange}
                                className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}
                            />
                        </div>

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
                        Save City
                    </button>
                </div>
            </div>
        </div>
    );
}
