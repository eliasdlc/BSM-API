import { useSignal } from "https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/dist/signals.js";
import MainScreen from "./main-screen.tsx";
import Statistics from "./statistics.tsx";

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
            {buttons.map((text, index) => (
                <button
                    key={index}
                    className={`
                        ${activeButton === text
                        ? "text-white text-extra bold"
                        : "text-opacity-25 text-white text-extra bold"
                    }
                    `}
                    onClick={() => onButtonClick(text)}
                >
                    {text}
                </button>
            ))}
        </div>
    );
}

interface HomeProps {
    path?: string
}

export default function Home({path}: HomeProps) {

    const headerButtons = ["Main Screen", "Statistics"];
    const view = useSignal("main-screen");
    const activeButton = useSignal(headerButtons[0]);



    const handleButtonClick = (button: string) => {
        activeButton.value = button;

        switch (button) {
            case "Main Screen":
                view.value = "main-screen";
                break;
            case "Statistics":
                view.value = "statistics";
                break;

        }

        console.log("view.value after click:", view.value);
    };

    return (
    <div className={"flex flex-col h-screen gap-5 "}>
        {/* Header */}
        <header
            className={
                "flex flex-row gap-3 text-white text-inter bg-[#312D2A] rounded-[32px] w-full h-[90px] p-5 text-lg text-extra bold"
            }>

            <TextButtons
                buttons={headerButtons}
                activeButton={activeButton.value}
                onButtonClick={handleButtonClick}
                className={"flex flex-row gap-5"}
            />
        </header>

        {/* Main */}
        <div className={"flex w-full h-full"}>
            <div className={"w-full h-full"}>
                {view.value === "main-screen" && <MainScreen />}
                {view.value === "statistics" && <Statistics />}
            </div>
        </div>
    </div>
  );
}