import { useSignal } from "https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/dist/signals.js";

// Import the necessary icons (you may need to adjust import paths)
import HomeIcon from "../static/HomeIcon.tsx";
import GameIcon from "../static/GameIcon.tsx";
import PlayerIcon from "../static/PlayerIcon.tsx";
import TeamIcon from "../static/TeamIcon.tsx";

type IconComponent = (props: { color: string }) => JSX.Element;


// SidebarButtons component
function SidebarButtons({
                            buttons,
                            activeButton,
                            onButtonClick,
                            className
                        }: {
    buttons: { icon: IconComponent, name: string }[],
    activeButton: string,
    onButtonClick: (button: string) => void,
    className?: string
}) {
    // Use signal for hover state
    const hoveredButton = useSignal<string | null>(null);

    // Hover event handlers
    const handleMouseEnter = (name: string) => {
        hoveredButton.value = name;
    };

    const handleMouseLeave = () => {
        hoveredButton.value = null;
    };

    return (
        <div className={className}>
            {buttons.map(({ icon: Icon, name }, index) => (
                <button
                    key={index}
                    className={`flex items-center justify-center p-1 ${
                        activeButton === name ? "click-shadow" : "normal-shadow"
                    } ${hoveredButton.value === name && activeButton != name ? "hover-shadow" : ""}`}
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

// Default sidebar buttons configuration
const defaultSidebarButtons = [
    { icon: (props: { color: string }) => <HomeIcon color={props.color} />, name: "home" },
    { icon: (props: { color: string }) => <GameIcon color={props.color} />, name: "game" },
    { icon: (props: { color: string }) => <TeamIcon color={props.color} />, name: "team" },
    { icon: (props: { color: string }) => <PlayerIcon color={props.color} />, name: "player" }
];

// Sidebar component props interface
interface SidebarProps {
    // Signal for managing current view
    view: { value: string };

    // Optional custom buttons configuration
    buttons?: { icon: IconComponent, name: string }[];

    // Logo source (optional)
    logoSrc?: string;

    // Additional className for customization
    className?: string;
}

// Sidebar component
export default function Sidebar({
                                    view,
                                    buttons = defaultSidebarButtons,
                                    logoSrc = "basketball-logo.png",
                                    className
                                }: SidebarProps) {
    // State for active button, synced with the view
    const activeButton = useSignal(
        buttons.find(btn => view.value.includes(btn.name))?.name || buttons[0].name
    );

    // Button click handler to update view and active button
    const handleButtonClick = (button: string) => {
        // Update active button
        activeButton.value = button;

        // Update view based on button
        switch (button) {
            case "home":
                view.value = "main-screen";
                break;
            case "game":
                view.value = "game-screen";
                break;
            case "team":
                view.value = "team-screen";
                break;
            case "player":
                view.value = "player-screen";
                break;
        }
    };

    return (
        <aside className={`flex flex-col gap-[5px] h-full w-[90px] ${className}`}>
            <img
                src={logoSrc}
                alt={"Basketball Logo"}
                className={"basketball-logo mb-3"}
            />
            <div
                className={
                    "bg-[#312D2A] text-white w-[90px] h-full flex flex-col rounded-[32px] gap-3 p-5"
                }
            >
                <SidebarButtons
                    buttons={buttons}
                    activeButton={activeButton.value}
                    onButtonClick={handleButtonClick}
                    className={"flex flex-col gap-5 hover:click-shadow transition-color duration-300"}
                />
            </div>
        </aside>
    );
}