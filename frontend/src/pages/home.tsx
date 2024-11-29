import { useState } from "react"; // Usamos useState de React
import MainScreen from "./main-screen.tsx";
import Statistics from "./statistics.tsx";

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

    // Usamos useState para manejar el estado de la vista activa y el botón activo
    const [view, setView] = useState<string>("main-screen");
    const [activeButton, setActiveButton] = useState<string>(headerButtons[0]); // Estado para el botón activo

    // Función para manejar el clic de los botones
    const handleButtonClick = (button: string) => {
        setActiveButton(button); // Actualiza el botón activo

        switch (button) {
            case "Main Screen":
                setView("main-screen"); // Cambia la vista a 'main-screen'
                break;
            case "Statistics":
                setView("statistics"); // Cambia la vista a 'statistics'
                break;
        }

        console.log("view after click:", view); // Verifica la vista activa
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
                    {view === "main-screen" && <MainScreen />} {/* Si la vista es main-screen, renderiza el componente */}
                    {view === "statistics" && <Statistics />} {/* Si la vista es statistics, renderiza el componente */}
                </div>
            </div>
        </div>
    );
}
