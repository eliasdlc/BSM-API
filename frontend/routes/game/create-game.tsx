import {  } from "https://deno.land/x/fresh@1.1.2/runtime.ts";
import {render} from "npm:preact@10.25.0";
import {Link} from "../../components/link.tsx";
import Main from "../../islands/Main.tsx"; // Si usas Fresh para navegación


interface CreateGameProps {
    path?: string
}



export default function CreateGame({path}: CreateGameProps){

    const container = document.getElementById("app-container");

    if (container) {
        container.innerHTML = ''; // Limpiar contenido previo
    }

    const goBackHandler = () => {
        console.log("Go back to game screen");
        location.href = "/";
    }

    const createGameHandler = () => {
        console.log("Crear nuevo juego");
    };

    return (
        <div className={"h-screen w-full gap-4 flex flex-col p-5"}>
            <div id={"formulario"} className={"bg-[#312d2a] flex-grow rounded-[32px] p-5"}>
                {/* TODO: Agregar elementos para modificar el juego */}
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
                    <button onClick={createGameHandler}
                            className={"bg-[#F0E0D6] text-[#201f1d] text-1xl font-bold rounded-3xl w-full min-w-64 h-full normal-shadow"}>
                        Save Game
                    </button>
                </div>
            </div>
        </div>

    )
}
// TODO: no me deja utilizar el boton despues de que vuelvo

