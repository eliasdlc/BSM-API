import {useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";

export default function CreatePlayer(){


    // DONE: Aqui se esta generando un problema con el renderizado de la pagina y el manejo de los dato, todavia nose.

    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate("/player");
    }

    const [formData, setFormData] = useState({
        playerId: "",
        teamId: "",
        number: "",
        name1: "",
        name2: "",
        lastname1: "",
        lastname2: "",
        cityBorn: "",
        yearBorn: ""
    })

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        const { name, value } = target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = () => {
        console.log("Input Value: ", formData)
    }



    return (
        <div className={"h-screen w-full gap-4 flex flex-col p-5"}>
            <div id={"formulario"} className={"flex flex-col bg-[#312d2a] flex-grow gap-5 rounded-[32px] p-5"}>
                {/* DONE: Agregar elementos elementos para el form */}
                {/* DONE: Hacer que los inputs se guarden en variables */}
                {/* TODO: Conectar el guardado con la DB */}


                <h1 className={"w-full text-xl text-[#F0E0D6] font-bold"}>Game Creation Process</h1>

                <div id={"game-info"} className={"flex flex-col gap-5"}>

                    <div id={"primary-player-info"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"player-id"} className={"flex flex-col gap-2 w-[25%]"}>
                            <label htmlFor={"player-id"} className={"text-[#F0E0D6] text-lg"}>Player ID</label>
                            <input type={"text"} id={"player-id"} name={"playerId"} value={formData.playerId} onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                        <div id={"team-id"} className={"flex flex-col gap-2 w-[25%]"}>
                            <label htmlFor={"team-id"} className={"text-[#F0E0D6] text-lg"}>Team ID</label>
                            <input type={"text"} id={"team-id"} name={"teamId"} value={formData.teamId}  onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                        <div id={"number"} className={"flex flex-col gap-2 w-[50%]"}>
                            <label htmlFor={"number"} className={"text-[#F0E0D6] text-lg"}>Number</label>
                            <input type={"number"} id={"number"} name={"number"} value={formData.number}  onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                    </div>

                    <div id={"player-names"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"name1"} className={"flex flex-col gap-2 w-[25%]"}>
                            <label htmlFor={"name"} className={"text-[#F0E0D6] text-lg"}>First Name</label>
                            <input type={"text"} id={"name1"} name={"name1"} value={formData.name1}  onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                        <div id={"name2"} className={"flex flex-col gap-2 w-[25%]"}>
                            <label htmlFor={"name2"} className={"text-[#F0E0D6] text-lg"}>Second Name</label>
                            <input type={"text"} id={"name2"} name={"name2"} value={formData.name2} onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                        <div id={"lastname1"} className={"flex flex-col gap-2 w-[25%]"}>
                            <label htmlFor={"lastname1"} className={"text-[#F0E0D6] text-lg"}>First Lastname</label>
                            <input type={"text"} id={"lastname1"} name={"lastname1"} value={formData.lastname1}  onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                        <div id={"lastname2"} className={"flex flex-col gap-2 w-[25%]"}>
                            <label htmlFor={"lastname2"} className={"text-[#F0E0D6] text-lg"}>Second Lastname</label>
                            <input type={"text"} id={"lastname2"} name={"lastname2"} value={formData.lastname2}  onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>
                    </div>


                    <div id={"secondary-player-info"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"city-born"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"city-born"} className={"text-[#F0E0D6] text-lg"}>City of Birth</label>
                            <input type={"text"} id={"city-born"} name={"cityBorn"} value={formData.cityBorn}  onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                        <div id={"year-born"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"year-born"} className={"text-[#F0E0D6] text-lg"}>Year of Birth</label>
                            <input type={"date"} id={"year-born"} name={"yearBorn"} value={formData.yearBorn}  onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>
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
