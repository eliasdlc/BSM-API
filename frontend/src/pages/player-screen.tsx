import { useState } from "react";
import { ListColumnConfig } from "../types/types.ts";
import { GenericList } from "../components/List";
import {useNavigate} from "react-router-dom";

enum PlayerScreenSection {
    ModifyPlayer = "Modify Player (Select an element)",
    CreatePlayer = "Create Player",
}

interface Player {
    id: number;
    firstName: string;
    lastName: string;
    cityBorn: string;
    yearBorn: number;
    number: number;
    teamId: number;
}

function TextButtons({
                         buttons,
                         activeButton,
                         onButtonClick,
                         className,
                     }: {
    buttons: string[];
    activeButton: string;
    onButtonClick: (button: string) => void;
    className?: string;
}) {
    return (
        <div className={className}>
            {buttons && buttons.length > 0 ? (
                buttons.map((text, index) => (
                    <button
                        key={index}
                        className={`bg-[#ffefe3] text-lg rounded-[16px] p-2 w-full h-full normal-shadow ${
                            activeButton === text
                                ? "text-[#211f1d] font-bold"
                                : "text-opacity-50 text-[#211f1d]"
                        }`}
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

export default function PlayerScreen() {
    const buttonsList = [
        PlayerScreenSection.ModifyPlayer,
        PlayerScreenSection.CreatePlayer,
    ];
    const [, setActiveSection] = useState<PlayerScreenSection>(
        PlayerScreenSection.ModifyPlayer
    );
    const [selectedUser, setSelectedUser] = useState<Player | undefined>(
        undefined
    );

    const allowModify = (user: Player) => {
        console.log("Selected user:", user);
        setSelectedUser(user);
    };

    const navigate = useNavigate();

    const handleButtonClick = (section: string) => {
        setActiveSection(section as PlayerScreenSection);

        if (section === PlayerScreenSection.CreatePlayer) {
            try {
                navigate("/player/create-player");
            } catch (error) {
                console.error("Error al navegar:", error);
            }
        } else if (section === PlayerScreenSection.ModifyPlayer) {
            //navigate("/modify-game"); // Navegar a la página de modificación
        }
    };

    // Datos de ejemplo
    const players: Player[] = [
        {
            id: 1,
            firstName: "John ",
            lastName: "Doe",
            cityBorn: "New York",
            yearBorn: 1995,
            number: 10,
            teamId: 1,
        },
        {
            id: 2,
            firstName: "Jane ",
            lastName: "Smith",
            cityBorn: "Los Angeles",
            yearBorn: 1992,
            number: 7,
            teamId: 1,
        },
        {
            id: 3,
            firstName: "Mike ",
            lastName: "Johnson",
            cityBorn: "Chicago",
            yearBorn: 1998,
            number: 3,
            teamId: 2,
        },
        {
            id: 4,
            firstName: "Emily ",
            lastName: "Davis",
            cityBorn: "Houston",
            yearBorn: 1993,
            number: 11,
            teamId: 2,
        },
        {
            id: 5,
            firstName: "Robert ",
            lastName: "Brown",
            cityBorn: "Phoenix",
            yearBorn: 1990,
            number: 23,
            teamId: 1,
        },
        {
            id: 6,
            firstName: "Sarah ",
            lastName: "Wilson",
            cityBorn: "Philadelphia",
            yearBorn: 1997,
            number: 18,
            teamId: 2,
        },
        {
            id: 7,
            firstName: "Chris ",
            lastName: "Miller",
            cityBorn: "San Antonio",
            yearBorn: 1999,
            number: 5,
            teamId: 1,
        },
        {
            id: 8,
            firstName: "Jessica ",
            lastName: "Martinez",
            cityBorn: "San Diego",
            yearBorn: 1994,
            number: 22,
            teamId: 2,
        },
        {
            id: 9,
            firstName: "Daniel ",
            lastName: "Hernandez",
            cityBorn: "Dallas",
            yearBorn: 1996,
            number: 12,
            teamId: 1,
        },
        {
            id: 10,
            firstName: "Laura ",
            lastName: "Taylor",
            cityBorn: "San Jose",
            yearBorn: 1991,
            number: 9,
            teamId: 2,
        },
    ];

    const userColumns: ListColumnConfig<Player>[] = [
        {
            key: "id",
            header: "ID",
            render: (value: string | number): JSX.Element => (
                <span className="font-bold text-[#F5672D]">#{value}</span>
            ),
        },
        { key: "firstName", header: "First Name" },
        { key: "lastName", header: "Last Name" },
        { key: "cityBorn", header: "City of Birth" },
        { key: "yearBorn", header: "Year of Birth" },
        { key: "number", header: "Number" },
        { key: "teamId", header: "Team ID" },
    ];

    const rowClassName = (_item: Player, index: number, isSelected?: boolean) =>
        isSelected
            ? "bg-[#F5672D] text-white"
            : index % 2 === 0
                ? "bg-[#F0E0D6]"
                : "bg-[#ffefe3]";

    return (
        <div className="flex flex-col gap-4 w-full h-full p-0">
            <header className="flex flex-col gap-3 text-white bg-[#312D2A] rounded-[32px] w-full h-[10%] p-5 text-lg font-bold justify-center">
                <h1 className="text-white text-2xl font-bold">Manage Players</h1>
            </header>

            <div className="flex flex-col gap-4 w-full flex-grow">
                <div className="bg-[#312D2A] rounded-[32px] w-full h-[85%] flex grow p-5">
                    <GenericList<Player>
                        data={players}
                        columns={userColumns}
                        rowClassName={rowClassName}
                        className="mx-auto w-full"
                        onRowClick={allowModify}
                        selectedItem={selectedUser}
                    />
                </div>
                <div className="w-full h-[15%] bg-[#312d2a] rounded-[32px]">
                    <TextButtons
                        className="flex flex-row gap-5 p-5 w-full h-full"
                        buttons={buttonsList}
                        activeButton={
                            selectedUser ? PlayerScreenSection.ModifyPlayer : PlayerScreenSection.CreatePlayer
                        }
                        onButtonClick={(section) =>
                            handleButtonClick(section as PlayerScreenSection)
                        }
                    />
                </div>
            </div>
        </div>
    );
}
