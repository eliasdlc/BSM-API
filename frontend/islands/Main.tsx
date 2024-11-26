import { JSX } from "preact/jsx-runtime";
import MainScreen from "../components/home.tsx";
import { useSignal } from "https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/dist/signals.js";

import HomeIcon from "../static/HomeIcon.tsx";
import GameIcon from "../static/GameIcon.tsx";
import PlayerIcon from "../static/PlayerIcon.tsx";
import TeamIcon from "../static/TeamIcon.tsx";
import GameScreen from "../components/game-screen.tsx";
import TeamScreen from "../components/team-screen.tsx";
import PlayerScreen from "../components/player-screen.tsx";

function SidebarButtons({
                            buttons,
                            activeButton,
                            onButtonClick,
                            className
                        }: {
    buttons: { icon: (props: { color: string }) => JSX.Element, name: string }[],
    activeButton: string,
    onButtonClick: (button: string) => void,
    className?: string
}) {
    // Usar useSignal para manejar el estado de hover
    const hoveredButton = useSignal<string | null>(null);

    // Funciones para manejar el hover
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
                        activeButton === name ? "click-shadow" : "unclick-shadow"
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




export default function Main() {
    const asideButtons = [
        { icon: (props: { color: string }) => <HomeIcon color={props.color} />, name: "home" },
        { icon: (props: { color: string }) => <GameIcon color={props.color} />, name: "game" },
        { icon: (props: { color: string }) => <TeamIcon color={props.color} />, name: "team" },
        { icon: (props: { color: string }) => <PlayerIcon color={props.color} />, name: "player" }
    ];

    const view = useSignal("main-screen");
    const activeButton = useSignal(asideButtons[0].name);

    const handleButtonClick = (button: string) => {
        // Update active button
        activeButton.value = button;

        // Update view based on button
        switch (button) {
            case "home":
            case "Main Screen":
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
            case "Statistics":
                view.value = "statistics-screen";
                break;
        }
    };

    return (
        <div className={"flex h-screen gap-5 p-5"}>
            {/* Sidebar */}
            <aside className={"flex flex-col gap-[5px] h-full w-[90px] "}>
                <img
                    src={"basketball-logo.png"}
                    alt={"Basketball Logo"}
                    className={"basketball-logo mb-3"}
                />
                <div
                    className={
                        "bg-[#312D2A] text-white w-[90px] h-full flex flex-col rounded-[32px] gap-3 p-5"
                    }
                >
                    <SidebarButtons
                        buttons={asideButtons}
                        activeButton={activeButton.value}
                        onButtonClick={handleButtonClick}
                        className={"flex flex-col gap-5 hover:click-shadow transition-color duration-300"}
                    />
                </div>
            </aside>

            <div className={"flex flex-row w-full flex-wrap gap-5"}>
                {/* Main content */}
                <div className={"w-full flex-grow"}>
                    {view.value === "main-screen" && <MainScreen />}
                    {view.value === "game-screen" && <GameScreen />}
                    {view.value === "team-screen" && <TeamScreen />}
                    {view.value === "player-screen" && <PlayerScreen />}
                </div>
            </div>

        </div>
    );
}