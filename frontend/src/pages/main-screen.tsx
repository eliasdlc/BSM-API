import GameViewComponent from "../components/gameViewComponent.tsx";
import {useState} from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate


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

export default function MainScreen() {
    const headerButtons = ["Main Screen", "Statistics"];
    const navigate = useNavigate(); // Inicializa el hook de navegación

    const [activeButton, setActiveButton] = useState<string>(headerButtons[0]);

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

    const recentGames = [
        { id: 1, localTeam: "The Huracains", localTeamLogo: "", visitorTeam: "The People", visitorTeamLogo: "", mvp: "Elias D. Jimenez", localScore: 123, visitorScore: 45, date: "2022-01-01" },
        { id: 2, localTeam: "The Camels", localTeamLogo: "", visitorTeam: "Acoustic", visitorTeamLogo: "", mvp: "Ronoroa Zoro", localScore: 100, visitorScore: 99, date: "2022-01-02" },
        { id: 3, localTeam: "Pokemons", localTeamLogo: "", visitorTeam: "The Mongols", visitorTeamLogo: "", mvp: "Joseph Joestar", localScore: 777, visitorScore: 0, date: "2022-01-03" },
        { id: 4, localTeam: "The Huracains", localTeamLogo: "", visitorTeam: "The People", visitorTeamLogo: "", mvp: "Elias D. Jimenez", localScore: 123, visitorScore: 45, date: "2022-01-01" },
        { id: 5, localTeam: "The Huracains", localTeamLogo: "", visitorTeam: "The People", visitorTeamLogo: "", mvp: "Elias D. Jimenez", localScore: 123, visitorScore: 45, date: "2022-01-01" },
        { id: 6, localTeam: "The Huracains", localTeamLogo: "", visitorTeam: "The People", visitorTeamLogo: "", mvp: "Elias D. Jimenez", localScore: 123, visitorScore: 45, date: "2022-01-01" },
        { id: 7, localTeam: "The Huracains", localTeamLogo: "", visitorTeam: "The People", visitorTeamLogo: "", mvp: "Elias D. Jimenez", localScore: 123, visitorScore: 45, date: "2022-01-01" },
    ]

    return (
        <div className={"flex flex-col h-full max-w-screen gap-4 overflow-hidden"}>
            {/* Header */}
            <header className="flex flex-row text-white text-xl bg-[#312D2A] rounded-[32px] w-full h-[90px] p-7 text-lg font-bold">
                <TextButtons
                    buttons={headerButtons}
                    activeButton={activeButton}
                    onButtonClick={handleButtonClick}
                    className="flex gap-7 flex-row justify-center items-center"
                />
            </header>
            <div className={"flex flex-row gap-4 w-full h-full"}>
                <div className={" bg-[#F0E0D6] rounded-[32px] w-[60%] h-full"}></div>
                <div className={" bg-[#F0E0D6] rounded-[32px] w-[40%] h-full"}></div>
            </div>

            <div className={"flex flex-col gap-4 h-full w-full p-0"}>
                <header className={"px-3 h-[30px] w-full font-bold text-xl text-white"}>Recent Games</header>

                {/* Display the recent games dynamically */}
                <div className="flex flex-row flex-shrink gap-4 h-full max-w-[1368px] w-full overflow-x-auto rounded-[16px]">
                    {recentGames.map((game) => (
                        <GameViewComponent key={game.id} {...game} />
                    ))}
                </div>


            </div>
        </div>

    )
}