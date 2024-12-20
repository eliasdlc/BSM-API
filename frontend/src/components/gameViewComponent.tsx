import MVPIcon from "../assets/MVPIcon.tsx";


export default function GameViewComponent({
                                              id,
                                              localTeam,
                                              localTeamLogo,
                                              visitorTeam,
                                              visitorTeamLogo,
                                              mvp,
                                              localScore,
                                              visitorScore,
                                          }: {
    id: number;
    localTeam: string;
    localTeamLogo: string;
    visitorTeam: string;
    visitorTeamLogo: string;
    mvp: string;
    localScore: number;
    visitorScore: number;
}) {
    return (
        <div key={id}
            className="flex flex-shrink-0 flex-col w-[320px] min-w-[320px] h-full shadow-lg">
            <div
                className="w-full h-full bg-[#F0E0D6] rounded-[16px] flex flex-col justify-center items-center">
                <div className="flex flex-row w-full h-fit p-5 gap-2.5 justify-center items-center">
                    <img
                        src={localTeamLogo || '/placeholder.png'}
                        alt={`${localTeam} logo`}
                        className="w-20 h-20 bg-white rounded-lg"
                    />
                    <h1 className="text-black text-sm font-bold">
                        {localScore} : {visitorScore}
                    </h1>
                    <img
                        src={visitorTeamLogo || '/placeholder.png'}
                        alt={`${visitorTeam} logo`}
                        className="w-20 h-20 bg-white rounded-lg"
                    />
                </div>
                <div
                    className="flex flex-row w-full p-2.5 gap-2.5 items-center justify-center">
                    <h1 className="text-black/50 text-sm font-semibold">MVP</h1>
                    <h1 className="text-black font-bold text-sm">{mvp}</h1>
                    <div className="h-[20px] w-[20px]">
                        <MVPIcon color={"black"}/>
                    </div>
                </div>

                <div className="flex flex-row w-full p-2.5 gap-2.5 items-center justify-center">
                    <h1 className="text-black/75 text-sm font-semibold">Game Date </h1>
                    <h1 className="text-black font-bold text-sm">05/09/2005</h1>
                </div>
            </div>

            <div
                className="w-full bg-[#F0E0D6] rounded-[16px] justify-center items-center flex p-2">
                <h1 className="text-black font-bold text-lg text-center">
                    {localTeam} vs {visitorTeam}
                </h1>
            </div>
        </div>
    )
}