import {useEffect, useState} from "react";
import { ListColumnConfig } from "../types/types.ts";
import { GenericList } from "../components/List";
import {useNavigate} from "react-router-dom";
import axios from "axios";


enum CityScreenSection {
    ModifyCity = "Modify City (Select an element)",
    DeleteCity = "Delete City",
    CreateCity = "Create City",
}

interface City {
    CodCiudad: string;
    Nombre: string
}

function TextButtons({
                         buttons,
                         isCitySelected,
                         onButtonClick,
                         className,
                     }: {
    buttons: string[];
    isCitySelected: boolean;
    onButtonClick: (button: string) => void;
    className?: string;
}) {
    return (
        <div className={className}>
            {buttons && buttons.length > 0 ? (
                buttons.map((text, index) => {
                    const isActive =
                        (text === CityScreenSection.CreateCity && !isCitySelected) ||
                        (isCitySelected && (text === CityScreenSection.ModifyCity || text === CityScreenSection.DeleteCity));

                    return(
                        <button
                            key={index}
                            className={`bg-[#ffefe3] text-lg rounded-[16px] p-2 w-full h-full normal-shadow ${
                                isActive ? "text-[#211f1d] font-bold" : "text-opacity-50 text-[#211f1d]"
                            }`}
                            onClick={() => onButtonClick(text)}
                        >
                            {text}
                        </button>
                    );
                })
            ) : (
                <div>No buttons available</div>
            )}
        </div>
    );
}

export default function CityScreen() {
    const buttonsList = [
        CityScreenSection.ModifyCity,
        CityScreenSection.DeleteCity,
        CityScreenSection.CreateCity,
    ];
    const [, setActiveSection] = useState<CityScreenSection>(
        CityScreenSection.ModifyCity
    );
    const [selectedCity, setSelectedCity] = useState<City | undefined>(
        undefined
    );

    const [cities, setCities] = useState<City[]>([]);
    const [, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get<City[]>("http://localhost:3000/Ciudad");
                setCities(response.data);
            } catch (error) {
                console.error("Error fetching cities:", error);
            } finally {
                setLoading(false); // Fin de la carga
            }
        };

        fetchCities().then(() => console.log("Cities fetched"));
    }, []);

    const allowModify = (city: City) => {
        console.log("Selected city:", city);
        setSelectedCity(city);
    };

    const navigate = useNavigate();

    const handleButtonClick = (section: string) => {
        setActiveSection(section as CityScreenSection);

        if (section === CityScreenSection.CreateCity) {
            try {
                navigate("/city/create-city");
            } catch (error) {
                console.error("Error al navegar:", error);
            }
        } else if (section === CityScreenSection.ModifyCity) {
            navigate("/city/modify-city", { state: { city: selectedCity } });
        } else if (section === CityScreenSection.DeleteCity) {
            if (selectedCity){
                const confirmDelete = window.confirm("Are you sure you want to delete this city?");
                if (confirmDelete) {
                    deleteCity(selectedCity.CodCiudad); // Eliminar el equipo
                }
            }
        }
    };

    const deleteCity = async (cityId: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/Ciudad/${cityId}`);
            console.log(response.data);
            alert("Team deleted successfully");

            // Actualizar la lista de equipos después de la eliminación
            setCities(cities.filter((cities) => cities.CodCiudad !== cityId));
            setSelectedCity(undefined); // Limpiar la selección del equipo
        } catch (error) {
            console.error("Error deleting team:", error);
            alert("Error deleting team");
        }
    };

    const cityColumns: ListColumnConfig<City>[] = [
        {
            key: "CodCiudad",
            header: "ID",
            width: "0.5fr",
            render: (value: string | number): JSX.Element => (
                <span className="font-bold text-[#F5672D]">#{value}</span>
            ),
        },
        { key: "Nombre", header: "Name" },

    ];

    const rowClassName = (_item: City, index: number, isSelected?: boolean) =>
        isSelected
            ? "bg-[#F5672D] text-white"
            : index % 2 === 0
                ? "bg-[#F0E0D6]"
                : "bg-[#ffefe3]";

    return (
        <div className="flex flex-col gap-4 w-full h-full p-0">
            <header className="flex flex-col gap-3 text-white bg-[#312D2A] rounded-[32px] w-full h-[10%] p-5 text-lg font-bold justify-center">
                <h1 className="text-white text-2xl font-bold">Manage Cities</h1>
            </header>

            <div className="flex flex-col gap-4 w-full flex-grow">

                <div className="bg-[#312D2A] rounded-[32px] w-full h-[85%] flex grow p-5">
                    <GenericList<City>
                        data={cities}
                        columns={cityColumns}
                        rowClassName={rowClassName}
                        className="mx-auto w-full"
                        onRowClick={allowModify}
                        selectedItem={selectedCity}
                    />
                </div>

                <div className="w-full h-[15%] bg-[#312d2a] rounded-[32px]">
                    <TextButtons
                        className="flex flex-row gap-5 p-5 w-full h-full"
                        buttons={buttonsList}
                        isCitySelected={!!selectedCity}
                        onButtonClick={(section) =>
                            handleButtonClick(section as CityScreenSection)
                        }
                    />
                </div>
            </div>
        </div>
    );
}
