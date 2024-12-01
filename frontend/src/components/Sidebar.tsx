import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importa hooks de navegación
import HomeIcon from "../assets/HomeIcon.tsx";
import GameIcon from "../assets/GameIcon.tsx";
import TeamIcon from "../assets/TeamIcon.tsx";
import PlayerIcon from "../assets/PlayerIcon.tsx";
import basketLogo from "../assets/basketball-logo.png";
import StatisticsIcon from "../assets/StatisticsIcon.tsx";
import CityIcon from "../assets/CityIcon.tsx";

type IconComponent = (props: { color: string }) => JSX.Element;

interface SidebarButtonsProps {
    buttons: { icon: IconComponent, name: string }[];
    activeButton: string;
    onButtonClick: (button: string) => void;
    className?: string;
}

function SidebarButtons({
                            buttons,
                            activeButton,
                            onButtonClick,
                            className
                        }: SidebarButtonsProps) {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    const handleMouseEnter = (name: string) => {
        setHoveredButton(name);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    return (
        <div className={className}>
            {buttons.map(({ icon: Icon, name }, index) => (
                <button
                    key={index}
                    className={`flex items-center justify-center p-1 ${
                        activeButton === name ? "click-shadow" : "normal-shadow"
                    } ${hoveredButton === name && activeButton !== name ? "hover-shadow" : ""}`}
                    onClick={() => onButtonClick(name)}
                    onMouseEnter={() => handleMouseEnter(name)}
                    onMouseLeave={handleMouseLeave}
                >
                    <Icon color={activeButton === name ? "#F5672D" : "white"} />
                </button>
            ))}
        </div>
    );
}

const defaultSidebarButtons = [
    { icon: (props: { color: string }) => <HomeIcon color={props.color} />, name: "home" },
    { icon: (props: { color: string }) => <GameIcon color={props.color} />, name: "game" },
    { icon: (props: { color: string }) => <TeamIcon color={props.color} />, name: "team" },
    { icon: (props: { color: string }) => <PlayerIcon color={props.color} />, name: "player" },
    { icon: (props: { color: string }) => <StatisticsIcon color={props.color} />, name: "statistics" },
    { icon: (props: { color: string }) => <CityIcon color={props.color} />, name: "city" },
];

export default function Sidebar({ className }: { className?: string }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Determina qué botón está activo basándote en la ruta actual
    const [activeButton, setActiveButton] = useState<string>(
        defaultSidebarButtons.find(btn => location.pathname.includes(btn.name))?.name || "home"
    );

    const handleButtonClick = (button: string) => {
        setActiveButton(button);

        // Navega a la ruta correspondiente
        switch (button) {
            case "home":
                navigate("/main-screen");
                break;
            case "game":
                navigate("/game");
                break;
            case "team":
                navigate("/team");
                break;
            case "player":
                navigate("/player");
                break;
            case "statistics":
                navigate("/statistics");
                break;
            case "city":
                navigate("/city");
                break;
        }
    };

    return (
        <aside className={`flex flex-col gap-[5px] h-full w-[90px] ${className}`}>
            <img
                src={basketLogo}
                alt={"Basketball Logo"}
                className={"basketball-logo mb-3"}
            />
            <div
                className={
                    "bg-[#312D2A] text-white w-[90px] h-full flex flex-col rounded-[32px] gap-3 p-5"
                }
            >
                <SidebarButtons
                    buttons={defaultSidebarButtons}
                    activeButton={activeButton}
                    onButtonClick={handleButtonClick}
                    className={"flex flex-col gap-5 hover:click-shadow transition-color duration-300"}
                />
            </div>
        </aside>
    );
}
