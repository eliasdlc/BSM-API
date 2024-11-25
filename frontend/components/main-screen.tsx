import MVPIcon from "../static/MVPIcon.tsx";
import gameView from "./gameViewComponent.tsx";
import GameView from "./gameViewComponent.tsx";
import GameViewComponent from "./gameViewComponent.tsx";

export default function MainScreen() {

    //const game1 = new gameView(1, "The Huracains", "", "The People", "", "Elias D. Jimenez", 123, 45);

    const recentGames = [
        { id: 1, localTeam: "The Huracains", localTeamLogo: "", visitorTeam: "The People", visitorTeamLogo: "", mvp: "Elias D. Jimenez", localScore: 123, visitorScore: 45, date: "2022-01-01" },
        { id: 2, localTeam: "The Camels", localTeamLogo: "", visitorTeam: "Acoustic", visitorTeamLogo: "", mvp: "Ronoroa Zoro", localScore: 100, visitorScore: 99, date: "2022-01-02" },
        { id: 3, localTeam: "Pokemons", localTeamLogo: "", visitorTeam: "The Mongols", visitorTeamLogo: "", mvp: "Joseph Joestar", localScore: 777, visitorScore: 0, date: "2022-01-03" },
        { id: 4, localTeam: "The Huracains", localTeamLogo: "", visitorTeam: "The People", visitorTeamLogo: "", mvp: "Elias D. Jimenez", localScore: 123, visitorScore: 45, date: "2022-01-01" },
    ]

    return (
        <div className={"flex flex-col h-screen gap-4 "}>
            <div className={"flex flex-row gap-4 w-full h-full"}>
                <div className={" bg-[#F0E0D6] rounded-[32px] w-full h-full"}></div>
                <div className={" bg-[#F0E0D6] rounded-[32px] w-1/2 h-full"}></div>

            </div>

            <div className={"flex flex-col gap-4 w-full h-full p-0"}>
                <header className={"px-3 h-[30px] w-full font-bold text-xl text-white"}>Recent Games</header>

                {/* Display the recent games dynamically */}
                <div className={"w-full overflow-x-auto"}>
                    <div className="flex flex-row w-full gap-3">
                        {recentGames.map((game) => (


                            <GameViewComponent {...game}></GameViewComponent>

                        ))}

                    </div>

                </div>


            </div>
        </div>

    )
}