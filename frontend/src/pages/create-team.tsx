import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";


export default function CreateTeam(){


    const [formData, setFormData] = useState({
        teamId: "",
        teamName: "",
        cityId: "",
    });

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log("Input Value: ", formData);
    };

    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate("/team")
    };


    return (
        <div className={"h-screen w-full gap-4 flex flex-col p-5"}>
            <div id={"formulario"} className={"flex flex-col bg-[#312d2a] flex-grow gap-5 rounded-[32px] p-5"}>
                {/* DONE: Agregar elementos elementos para el form */}
                {/* DONE: Hacer que los inputs se guarden en variables */}
                {/* TODO: Conectar el guardado con la DB */}


                <h1 className={"w-full text-xl text-[#F0E0D6] font-bold"}>Team Creation Process</h1>

                <div id={"game-info"} className={"flex flex-col gap-5"}>

                    <div id={"team-id"} className={"flex flex-row gap-5 w-full"}>
                        <div id={"team-id"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"team-id"} className={"text-[#F0E0D6] text-lg"}>Team ID</label>
                            <input type={"text"} id={"team-id"} name={"teamId"} value={formData.teamId} onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>

                        <div id={"city-id"} className={"flex flex-col gap-2 w-full"}>
                            <label htmlFor={"city-id"} className={"text-[#F0E0D6] text-lg"}>City ID</label>
                            <input type={"text"} id={"city-id"} name={"cityId"} value={formData.cityId} onChange={handleInputChange}
                                   className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
                        </div>
                    </div>


                    <div id={"team-name"} className={"flex flex-col gap-2"}>
                        <label htmlFor={"team-name"} className={"text-[#F0E0D6] text-lg"}>Team Name</label>
                        <input type={"text"} id={"team-name"} name={"teamName"} value={formData.teamName} onChange={handleInputChange}
                               className={"bg-[#F0E0D6] text-[#201f1d] text-lg p-2 rounded-2xl w-full normal-shadow"}/>
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
                        Save Team
                    </button>
                </div>
            </div>
        </div>

    )
}
