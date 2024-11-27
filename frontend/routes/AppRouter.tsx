import Router from "https://esm.sh/preact-router";
import GameScreen from "./game-screen.tsx";
import CreateGame from "./game/create-game.tsx";
import ModifyGame from "./game/modify-game.tsx";
import Home from "../components/home.tsx";
import Main from "../islands/Main.tsx";
import MainScreen from "../components/main-screen.tsx";




export default function AppRouter() {
    return (
        <Router>
            <GameScreen path="/" />
            <CreateGame path="/create-game" />
            <ModifyGame path="/modify-game" />
            <Main path="frontend/islands/Main.tsx" />
        </Router>
    );
}
