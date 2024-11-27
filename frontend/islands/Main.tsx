import { useSignal } from "https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/dist/signals.js";
import Sidebar from "../components/Sidebar.tsx";
import MainScreen from "../components/home.tsx";
import GameScreen from "../routes/game-screen.tsx";
import TeamScreen from "../components/team-screen.tsx";
import PlayerScreen from "../components/player-screen.tsx";

export default function Main({path}: { path?: string }) {

    const view = useSignal("main-screen");


    return (
        <div className={"flex h-screen gap-5 p-5"}>
            {/* Sidebar now directly manages view changes */}
            <Sidebar view={view} />

            <div className={"flex flex-row w-full flex-wrap gap-5"}>
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