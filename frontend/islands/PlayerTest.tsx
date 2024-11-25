import { useEffect, useState } from "https://esm.sh/v128/preact@10.22.0/hooks";

export default function PlayerTest() {
    interface Player {
        CodJugador: string;
        Nombre1: string;
        CodEquipo: string;
    }

    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        async function fetchPlayers() {
            try {
                const response = await fetch("http://localhost:3000/players");
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setPlayers(data);
                } else {
                    console.error("Received data is not an array:", data);
                }
            } catch (error) {
                console.error("Failed to fetch players:", error);
            }
        }

        fetchPlayers().then(r => console.log("Players fetched"));
    }, []); // Only runs once on component mount

    return (
        <div>
            <h1>Jugadoreishons:</h1>
            <ul>
                {players.length > 0 ? (
                    players.map((player) => (
                        <li key={player.CodJugador}>{player.Nombre1} - {player.CodJugador}</li>
                    ))
                ) : (
                    <li>No players available</li>
                )}
            </ul>
        </div>
    );
}
