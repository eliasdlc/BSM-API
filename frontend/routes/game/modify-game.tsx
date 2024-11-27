interface ModifyGameProps {
    path?: string
}

export default function ModifyGame({path}: ModifyGameProps){
    return (
        <div className={"h-screen w-screen flex flex-col flex-gorw flex-shrink p-5"}>
            <div className={"bg-[#312d2a] h-[85%] w-full"}>
                {// TODO: Agregar elementos para modificar el juego
                }
            </div>
            <div className={"bg-[#F0E0D6] h-[15%] w-full"}>
                {/* TODO: Agregar botones para modificar el juego*/}
            </div>
        </div>
    )
}