export default function TeamScreen() {

    return (
        <div className={"flex flex-col h-screen gap-5"}>
            <div className={"flex flex-row gap-4 w-full h-full"}>
                <div className={" bg-[#F0E0D6] rounded-[32px] w-full h-full "}></div>
                <div className={" bg-[#F0E0D6] rounded-[32px] w-1/2 h-full"}></div>

            </div>

            <div className={"flex flex-col gap-3 w-full h-full p-5"}>
                <header className={"h-[30px] w-full text-bold text-lg text-white"}>Recent Games</header>

                <div>
                </div>

            </div>
        </div>
    )
}