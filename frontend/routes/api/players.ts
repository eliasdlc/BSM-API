const API_URL = "http://localhost:3000/players";

export async function getPlayers() {
    try {
        const response = await fetch(API_URL);
        const players = await response.json();
        return players;
    } catch (error) {
        console.error("Error fetching players:", error);
        return [];
    }
}
