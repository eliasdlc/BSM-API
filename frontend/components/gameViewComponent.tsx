import MVPIcon from "../static/MVPIcon.tsx";

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
             className=" flex flex-col flex-wrap inline-flex justify-start items-start inline-flex w-[320px] h-[230px] shadow-lg">

            <div
                className="self-stretch h-[185px] bg-[#F0E0D6] rounded-[16px] flex-col justify-start items-center flex">
                <div className={"flex flex-row w-full h-fit p-5 gap-2.5 justify-center items-center inline-flex"}>
                    <img src={localTeamLogo} alt="placeholder"
                         className="w-20 h-20 bg-white rounded-lg"/>
                    <h1 className={"tex-black text-sm font-bold"}>{localScore} : {visitorScore}</h1>
                    <img src={visitorTeamLogo} alt="placeholder"
                         className="w-20 h-20 bg-white rounded-lg"/>
                </div>
                <div
                    className={"flex flex-row w-full self-stretch grow shirnk p-2.5 gap-2.5 inline-flex items-center justify-center"}>
                    <h1 className={"text-black/50 text-sm font-semibold"}>MVP</h1>
                    <h1 className={"text-black font-bold text-sm"}>{mvp}</h1>
                    <div className={"h-[20px] w-[20px]"}><MVPIcon/></div>
                </div>
            </div>

            <div
                className={"self-stretch grow shrink basis-0 bg-[#F0E0D6] rounded-[16px] justify-center items-center gap-2.5 inline-flex"}>
                <h1 className={"text-black font-bold text-lg"}> {localTeam} vs {visitorTeam}</h1>
            </div>

        </div>
    )
}