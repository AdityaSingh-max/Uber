import React from "react";

const LocationSearchPanel = ({
    suggestions,
    onSuggestionClick
}) => {

    return (
        <div>

            {suggestions.map((location, index) => (

                <div
                    key={index}
                    onClick={() => onSuggestionClick(location)}
                    className="flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer"
                >

                    <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
                        <i className="ri-map-pin-fill"></i>
                    </h2>

                    <h4 className="font-medium">
                        {location.description}
                    </h4>

                </div>

            ))}

        </div>
    );
};

export default LocationSearchPanel;