import { useState } from "react"; // Usamos useState de React
import { useNavigate } from "react-router-dom"; // Importa useNavigate


// Componente para los botones de la cabecera
function TextButtons({
                         buttons,
                         activeButton,
                         onButtonClick,
                         className
                     }: {
    buttons: string[];
    activeButton: string;
    onButtonClick: (button: string) => void;
    className?: string;
}) {
    return (
        <div className={className}>
            {buttons.map((text, index) => (
                <button
                    key={index}
                    className={`
                        ${activeButton === text
                        ? "text-white font-bold" // Añadí font-bold
                        : "text-opacity-25 text-white font-bold" // Añadí font-bold
                    } 
                    text-xl rounded-md transition-all duration-200 hover:bg-opacity-50`} // Mejoré accesibilidad con px, py y hover
                    onClick={() => onButtonClick(text)}
                >
                    {text}
                </button>
            ))}
        </div>
    );
}

// Componente principal
export default function Home() {
    const headerButtons = ["Main Screen", "Statistics"];
    const navigate = useNavigate(); // Inicializa el hook de navegación

    // Estado para el botón activo
    const [activeButton, setActiveButton] = useState<string>(headerButtons[0]);

    // Función para manejar el clic de los botones
    const handleButtonClick = (button: string) => {
        setActiveButton(button); // Actualiza el botón activo

        switch (button) {
            case "Main Screen":
                navigate("/main-screen"); // Navega a la ruta principal
                break;
            case "Statistics":
                navigate("/home/stored-procedure"); // Navega a la ruta de estadísticas
                break;
        }
    };

    return (
        <div className="flex flex-col h-full w-full gap-5">
            {/* Header */}
            <header className="flex flex-row text-white text-xl bg-[#312D2A] rounded-[32px] w-full h-[90px] p-7 text-lg font-bold">
                <TextButtons
                    buttons={headerButtons}
                    activeButton={activeButton}
                    onButtonClick={handleButtonClick}
                    className="flex gap-7 flex-row justify-center items-center"
                />
            </header>

            {/* Main */}
            <div className="flex w-full h-full">
                <div className="w-full h-full">
                    {/* El contenido ahora se maneja con enrutador */}
                </div>
            </div>
        </div>
    );
}
