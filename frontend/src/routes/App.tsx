import '../styles/App.css';
import Sidebar from "../components/Sidebar.tsx";
import Home from "../pages/home.tsx";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import CreateGame from "../pages/create-game.tsx";
import GameScreen from "../pages/game-screen.tsx";
import TeamScreen from "../pages/team-screen.tsx";
import PlayerScreen from "../pages/player-screen.tsx";
import CreateTeam from "../pages/create-team.tsx";
import CreatePlayer from "../pages/create-player.tsx";
import ModifyTeam from "../pages/modify-team.tsx";
import Statistics from "./statistics.tsx";
import CreateStatistics from "../pages/create-statistics.tsx";

function App() {
    const location = useLocation(); // Obtiene la ruta actual

    // Condicionamos que el Sidebar no se renderice en la ruta '/game/create-game'
    const showSidebar = !location.pathname.includes("/game/create-game")
                                && !location.pathname.includes("/team/create-team")
                                && !location.pathname.includes("/player/create-player")
                                && !location.pathname.includes("/statistics/create-statistics");

    return (
        <div className="flex h-screen w-screen gap-5 p-5">
            {showSidebar && <Sidebar className="sidebar" />}
            <main className="flex flex-row w-full flex-wrap gap-5">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game" element={<GameScreen />} />
                    <Route path="/game/create-game" element={<CreateGame />} />
                    {/*<Route path="/game/modify-game" element={<ModifyGame />} />*/}
                    <Route path="/team" element={<TeamScreen />} />
                    <Route path="/team/create-team" element={<CreateTeam />} />
                    <Route path="/team/modify-team" element={<ModifyTeam />} />
                    <Route path="/player" element={<PlayerScreen />} />
                    <Route path="/player/create-player" element={<CreatePlayer />} />
                    {/*<Route path="/player/modify-player" element={<ModifyPlayer />} />*/}
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/statistics/create-statistics" element={<CreateStatistics />} />
                    {/*<Route path="/statistics/modify-statistics" element={<ModifyStatistics />} />*/}
                </Routes>
            </main>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
