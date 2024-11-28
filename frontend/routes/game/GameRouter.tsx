import Router from "https://esm.sh/preact-router";
import GameScreen from "../game-screen.tsx";
import Main from "../../islands/Main.tsx";
import CreateGame from "../../islands/CreateGame.tsx";
import ModifyGame from "./modify-game.tsx";




export default function AppRouter() {
    return (
        <Router>
            <GameScreen path="/" />
            <CreateGame path="/create-game" />
            <ModifyGame path="/modify-game" />
            <Main path="/Main" />
        </Router>
    );
}
