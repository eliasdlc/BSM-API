import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Importa useParams
import {useNavigate} from "react-router-dom";


interface GameInfo {
    CodJuego: string;
    Fecha: string;
    EquipoLocal: string;
    EquipoVisitante: string;
}

interface EstadisticaJugador {
    Jugador: string;
    Equipo: string;
    Puntos: number;
    Asistencias: number;
    Rebotes: number;
    BolasRobadas: number;
    Faltas: number;
    Tecnicas: number;
    BolasPerdidas: number;
    TirosLibres: number;
}

interface ApiResponse {
    gameInfo: GameInfo;
    estadisticasEquipoLocal: EstadisticaJugador[];
    totalesEquipoLocal: Record<string, number>;
    estadisticasEquipoVisitante: EstadisticaJugador[];
    totalesEquipoVisitante: Record<string, number>;
    winner: { Resultado: string }[];
    loser: { Resultado: string }[];
}

export default function GameDetails() {
    const { gameId } = useParams<{ gameId: string }>();
    const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
    const [estadisticasEquipoLocal, setEstadisticasEquipoLocal] = useState<EstadisticaJugador[]>([]);
    const [estadisticasEquipoVisitante, setEstadisticasEquipoVisitante] = useState<EstadisticaJugador[]>([]);
    const [totalesEquipoLocal, setTotalesEquipoLocal] = useState<Record<string, number>>({});
    const [totalesEquipoVisitante, setTotalesEquipoVisitante] = useState<Record<string, number>>({});
    const [winner, setWinner] = useState<string | null>(null); // Estado para el ganador
    const [loser, setLoser] = useState<string | null>(null); // Estado para el ganador
    const navigate = useNavigate();


    useEffect(() => {
        const fetchEstadisticas = async () => {
            try {
                const response = await axios.get<ApiResponse>(`http://localhost:3000/EstadisticaJuego/${gameId}`);
                const data = response.data;

                console.log("Datos del servidor:", data);

                setGameInfo(data.gameInfo);
                setEstadisticasEquipoLocal(data.estadisticasEquipoLocal);
                setEstadisticasEquipoVisitante(data.estadisticasEquipoVisitante);
                setTotalesEquipoLocal(data.totalesEquipoLocal);
                setTotalesEquipoVisitante(data.totalesEquipoVisitante);
                setWinner(data.winner[0].Resultado); // Accede correctamente al ganador
                setLoser(data.loser[0].Resultado);   // Accede correctamente al perdedor

            } catch (error) {
                console.error("Error fetching game stats:", error);
                setGameInfo(null);
                setEstadisticasEquipoLocal([]);
                setEstadisticasEquipoVisitante([]);
                setTotalesEquipoLocal({});
                setTotalesEquipoVisitante({});
                setWinner(null); // Restablece el ganador en caso de error
                setLoser(null);
            }
        };

        if (gameId) {
            fetchEstadisticas();
        }
    }, [gameId]);

    const goBackHandler = () => {
        console.log("Go back to city screen");
        navigate("/home/stored-procedure");
    };


    return (


        <div className={"flex flex-col gap-5 w-full h-full"}>

            <div className="flex flex-col gap-4 w-full h-full p-5 bg-[#312D2A] rounded-[32px] text-white overflow-auto">
                {gameInfo ? (
                    <>
                        {/* Encabezado del juego */}
                        <h2 className="text-2xl font-bold">
                            Juego {gameInfo.CodJuego} - {gameInfo.EquipoLocal} vs {gameInfo.EquipoVisitante}
                        </h2>
                        <p>Fecha: {new Date(gameInfo.Fecha).toLocaleDateString()}</p>


                        {/* Puntaje del equipo 1 */}
                        <h3 className="text-2xl font-bold mt-4">{winner}</h3>
                        <table className="table-auto w-full mb-4 text-black w-full mb-4 bg-[#f0e0d6] rounded-3xl">
                            <thead>
                            <tr>
                                <th className="px-4 py-2">Jugador</th>
                                <th className="px-4 py-2">Puntos</th>
                                <th className="px-4 py-2">Asistencias</th>
                                <th className="px-4 py-2">Rebotes</th>
                                <th className="px-4 py-2">Bolas Robadas</th>
                                <th className="px-4 py-2">Faltas</th>
                                <th className="px-4 py-2">Tecnicas</th>
                                <th className="px-4 py-2">Bolas Perdidas</th>
                                <th className="px-4 py-2">Tiros Libres</th>
                            </tr>
                            </thead>
                            <tbody>
                            {estadisticasEquipoLocal.map((player, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="px-4 py-2">{player.Jugador}</td>
                                    <td className="px-4 py-2">{player.Puntos}</td>
                                    <td className="px-4 py-2">{player.Asistencias}</td>
                                    <td className="px-4 py-2">{player.Rebotes}</td>
                                    <td className="px-4 py-2">{player.BolasRobadas}</td>
                                    <td className="px-4 py-2">{player.Faltas}</td>
                                    <td className="px-4 py-2">{player.Tecnicas}</td>
                                    <td className="px-4 py-2">{player.BolasPerdidas}</td>
                                    <td className="px-4 py-2">{player.TirosLibres}</td>
                                </tr>
                            ))}
                            </tbody>

                        </table>
                        <p className="font-semibold">
                            Total del
                            equipo: {totalesEquipoLocal.Puntos} puntos, {totalesEquipoLocal.Asistencias} asistencias,{" "}
                            {totalesEquipoLocal.Rebotes} rebotes, {totalesEquipoLocal.BolasRobadas} bolas
                            robadas, {totalesEquipoLocal.Faltas} faltas,
                            {totalesEquipoLocal.Technicas} técnicas, {totalesEquipoLocal.BolasPerdidas} bolas
                            perdidas, {" "}
                            {totalesEquipoLocal.TirosLibres} tiros libres
                        </p>

                        {/* Puntaje del equipo 2 */}
                        <h3 className="text-2xl font-bold mt-4">{loser}</h3>
                        <table className="table-auto text-black w-full mb-4 bg-[#f0e0d6] rounded-3xl">
                            <thead>
                            <tr>
                                <th className="px-4 py-2">Jugador</th>
                                <th className="px-4 py-2">Puntos</th>
                                <th className="px-4 py-2">Asistencias</th>
                                <th className="px-4 py-2">Rebotes</th>
                                <th className="px-4 py-2">Bolas Robadas</th>
                                <th className="px-4 py-2">Faltas</th>
                                <th className="px-4 py-2">Tecnicas</th>
                                <th className="px-4 py-2">Bolas Perdidas</th>
                                <th className="px-4 py-2">Tiros Libres</th>
                            </tr>
                            </thead>
                            <tbody>
                            {estadisticasEquipoVisitante.map((player, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="px-4 py-2">{player.Jugador}</td>
                                    <td className="px-4 py-2">{player.Puntos}</td>
                                    <td className="px-4 py-2">{player.Asistencias}</td>
                                    <td className="px-4 py-2">{player.Rebotes}</td>
                                    <td className="px-4 py-2">{player.BolasRobadas}</td>
                                    <td className="px-4 py-2">{player.Faltas}</td>
                                    <td className="px-4 py-2">{player.Tecnicas}</td>
                                    <td className="px-4 py-2">{player.BolasPerdidas}</td>
                                    <td className="px-4 py-2">{player.TirosLibres}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <p className="font-semibold">
                            Total del
                            equipo: {totalesEquipoVisitante.Puntos} puntos, {totalesEquipoVisitante.Asistencias} asistencias,{" "}
                            {totalesEquipoVisitante.Rebotes} rebotes, {totalesEquipoVisitante.BolasRobadas} bolas
                            robadas, {totalesEquipoVisitante.Faltas} faltas,
                            {totalesEquipoVisitante.Technicas} técnicas, {totalesEquipoVisitante.BolasPerdidas} bolas
                            perdidas, {" "}
                            {totalesEquipoVisitante.TirosLibres} tiros libres
                        </p>
                    </>
                ) : (
                    <p>Cargando información del juego...</p>
                )}

            </div>

            <div
                id={"button-holder"}
                className={"flex flex-row gap-5 bg-[#312d2a] h-[10%] w-full rounded-[32px] p-5 items-center justify-center"}
            >
                <div id={"go-back"} className={"flex-1"}>
                    <button
                        onClick={goBackHandler}
                        className={"text-[#F0E0D6] text-1xl font-bold text-opacity-25 w-[100px] h-[50px] hover:text-opacity-100"}
                    >
                        Go Back
                    </button>
                </div>

            </div>
        </div>


    )
        ;
}
