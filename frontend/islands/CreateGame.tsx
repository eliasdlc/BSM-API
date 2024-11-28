import { useSignal } from "https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/dist/signals.js";

interface CreateGameProps {
    path?: string
}



export default function CreateGame({path}: CreateGameProps){

    const container = document.getElementById("app-container");

    if (container) {
        container.innerHTML = ''; // Limpiar contenido previo
    }

    // TODO: Aqui se esta generando un problema con el renderizado de la pagina y el manejo de los dato, todavia nose.

    const goBackHandler = () => {
        console.log("Go back to game screen");
        location.href = "/";
    }

    const formData = useSignal({
        localTeam: "",
        visitorTeam: "",
        gameDate: "",
        gameDescription: ""
    })

    const handleInputChange = (e: Event) => {
        const target = e.target as HTMLInputElement
        const { name, value } = target;

        formData.value = {...formData.value, [name]: value}
    }

    const handleSubmit = () => {
        console.log("Input Value: ", formData.value)
    }



    return (
        <div className={"h-screen w-full gap-4 flex flex-col p-5"}>
            <div id={"formulario"} className={"flex flex-col bg-[#312d2a] flex-grow gap-5 rounded-[32px] p-5"}>
                {/* DONE: Agregar elementos elementos para el form */}
                {/* TODO: Hacer que los inputs se guarden en variables */}
                {/* TODO: Conectar el guardado con la DB */}


                <h1 className={"w-full text-xl text-[#F0E0D6] font-bold"}>Game Creation Process</h1>

                <div id={"game-info"} className={"flex flex-col gap-5"}>

                    <div id={"team-names"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"local-team"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"local-team"} className={"text-[#F0E0D6] text-lg"}>Local Team Name</label>
                            <input type={"text"} id={"local-team"} name={"local-team"} onInput={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                        <div id={"visitor-team"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"visitor-team"} className={"text-[#F0E0D6] text-lg"}>Visitor Team
                                Name</label>
                            <input type={"text"} id={"visitor-team"} name={"visitor-team"} onInput={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>
                    </div>


                    <div id={"game-date"} className={"flex flex-col gap-2"}>
                        <label htmlFor={"game-date"} className={"text-[#F0E0D6] text-lg"}>Game Date</label>
                        <input type={"date"} id={"game-date"} name={"game-date"} onInput={handleInputChange}
                               className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                    </div>

                    <div id={"game-description"} className={"flex flex-col gap-2"}>
                        <label htmlFor={"game-description"} className={"text-[#F0E0D6] text-lg"}>Game
                            Description</label>
                        <input type={"text"} id={"game-description"} name={"game-description"} onInput={handleInputChange}
                               className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full h-[150px] normal-shadow"}/>
                    </div>
                </div>

            </div>

            <div id={"button-holder"}
                 className={"flex flex-row gap-5 bg-[#312d2a] h-[10%] w-full rounded-[32px] p-5 items-center justify-center"}>
                <div id={"go-back"} className={"flex-1"}>
                    <button onClick={goBackHandler}
                            className={"text-[#F0E0D6] text-1xl font-bold text-opacity-25 w-[100px] h-[50px] hover:text-opacity-100"}>
                        Go Back
                    </button>
                </div>

                <div id={"buttons"} className={"flex-2 items-end justify-center h-full"}>
                    <button onClick={handleSubmit}
                            className={"bg-[#F0E0D6] text-[#201f1d] text-1xl font-bold rounded-2xl w-full min-w-64 h-full normal-shadow"}>
                        Save Game
                    </button>
                </div>
            </div>
        </div>

    )
}
