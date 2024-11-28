import { useSignal } from "https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/dist/signals.js";
import { GenericList, ListColumnConfig } from "./List/index.tsx";

enum TeamScreenSection {
    ModifyTeam = "Modify Team (Select an element)",
    CreateTeam = "Create Team"
}

interface Team {
    id: number;
    name: string;
    city: string;
    foundationYear: number;
    stadium: string;
    championshipsWon: number;
}

function TextButtons({
                         buttons,
                         activeButton,
                         onButtonClick,
                         className
                     }: {
    buttons: string[],
    activeButton: string,
    onButtonClick: (button: string) => void,
    className?: string
}) {
    return (
        <div className={className}>
            {buttons && buttons.length > 0 ? (
                buttons.map((text, index) => (
                    <button
                        key={index}
                        className={`bg-[#ffefe3] text-lg rounded-[16px] p-2 w-full h-full normal-shadow
                            ${activeButton === text
                            ? "text-[#211f1d] font-bold" // Cambia el color y estilo cuando está activo
                            : "text-opacity-50 text-[#211f1d]"}`}
                        onClick={() => onButtonClick(text)}
                    >
                        {text}
                    </button>
                ))
            ) : (
                <div>No buttons available</div>
            )}
        </div>
    );
}

interface TeamScreenProps {
    path?: string
}

export default function TeamScreen({ path }: TeamScreenProps) {

    const buttonsList = [TeamScreenSection.ModifyTeam, TeamScreenSection.CreateTeam];
    const activeSection = useSignal<TeamScreenSection>(TeamScreenSection.ModifyTeam);
    const activeButton = useSignal(buttonsList[0]);

    // Estado para almacenar el equipo seleccionado
    const selectedTeam = useSignal<Team | undefined>(undefined);

    const allowModify = (team: Team) => {
        console.log('Selected team:', team);
        selectedTeam.value = team;
    }

    const handleButtonClick = (section: string) => {
        activeSection.value = section as TeamScreenSection;

        const container = document.getElementById("app-container");

        if (container && !selectedTeam) {
            console.log("Se limpió el container");
            container.innerHTML = ''; // Limpiar contenido previo
        }
    }

    // Datos de ejemplo
    const teams: Team[] = [
        { id: 1, name: "New York Knights", city: "New York", foundationYear: 1920, stadium: "Knights Arena", championshipsWon: 5 },
        { id: 2, name: "Los Angeles Stars", city: "Los Angeles", foundationYear: 1945, stadium: "Star Dome", championshipsWon: 3 },
        { id: 3, name: "Chicago Bears", city: "Chicago", foundationYear: 1935, stadium: "Bear Grounds", championshipsWon: 7 },
        { id: 4, name: "Houston Hawks", city: "Houston", foundationYear: 1950, stadium: "Hawk Nest", championshipsWon: 2 },
        { id: 5, name: "Phoenix Flames", city: "Phoenix", foundationYear: 1980, stadium: "Flame Field", championshipsWon: 1 },
        { id: 6, name: "Philadelphia Eagles", city: "Philadelphia", foundationYear: 1925, stadium: "Eagle Stadium", championshipsWon: 4 },
        { id: 7, name: "San Antonio Spurs", city: "San Antonio", foundationYear: 1968, stadium: "Spur Arena", championshipsWon: 6 },
        { id: 8, name: "San Diego Sharks", city: "San Diego", foundationYear: 1990, stadium: "Shark Tank", championshipsWon: 2 },
        { id: 9, name: "Dallas Titans", city: "Dallas", foundationYear: 1915, stadium: "Titan Coliseum", championshipsWon: 8 },
        { id: 10, name: "San Jose Giants", city: "San Jose", foundationYear: 1975, stadium: "Giant Park", championshipsWon: 3 },
    ];

    const teamColumns: ListColumnConfig<Team>[] = [
        {
            key: 'id',
            header: 'ID',
            render: (value: string | number): JSX.Element =>
                (<span className="font-bold text-[#F5672D]">#{value}</span>),
        },
        {
            key: 'name',
            header: 'Team Name',
        },
        {
            key: 'city',
            header: 'City',
        },
        {
            key: 'foundationYear',
            header: 'Foundation Year',
        },
        {
            key: 'stadium',
            header: 'Stadium',
        },
        {
            key: 'championshipsWon',
            header: 'Championships Won',
        },
    ];

    const rowClassName = (item: Team, index: number, isSelected?: boolean) =>
        isSelected ? 'bg-[#F5672D] text-white' : (index % 2 === 0 ? 'bg-[#F0E0D6]' : 'bg-[#ffefe3]');

    return (
        <div id={"app-container"} className={"flex flex-col gap-4 w-full h-full p-0"}>
            <header
                className={
                    "flex flex-col gap-3 text-white text-inter bg-[#312D2A] rounded-[32px] w-full h-[10%] p-5 text-lg text-extra bold justify-center"
                }>
                <h1 className={"text-white text-2xl font-bold"}>Manage Teams</h1>
            </header>

            <div className={"flex flex-col gap-4 w-full flex-grow"}>
                <div className={" bg-[#312D2A] rounded-[32px] w-full h-[85%] flex grow p-5"}>
                    <GenericList<Team>
                        data={teams}
                        columns={teamColumns}
                        rowClassName={rowClassName}
                        className="mx-auto w-full"
                        onRowClick={allowModify}
                        selectedItem={selectedTeam.value}
                    />
                </div>
                <div className={"w-full h-[15%] bg-gray bg-[#312d2a] rounded-[32px] "}>
                    <TextButtons className={"flex flex-row gap-5 p-5 w-full h-full "} buttons={buttonsList}
                                 activeButton={selectedTeam.value ? TeamScreenSection.ModifyTeam : TeamScreenSection.CreateTeam}
                                 onButtonClick={(section) => handleButtonClick(section as TeamScreenSection)}/>
                </div>
            </div>
        </div>
    )
}
