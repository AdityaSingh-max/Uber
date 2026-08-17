import React from "react";

const LocationSearchPanel = (props) => {
  // sample array for location
  const locations = [
    "24B, Near Kapoor's cafe, Tej Pratap Nagar, Patna",
    "22C, Near Aryan's cafe, Tej Pratap Nagar, Patna",
    "14S, Near Shibin's library, Bangali Tola, Tej Pratap Nagar, Patna",
    "6G, Near Shubh's cafe, Tej Pratap Nagar, Patna",
  ];

  return (
    <div>
      {/* This is just a sample data */}

      {locations.map((elem,idx) => {
        return (
          <div key={idx} onClick={()=>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
            }} className="flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start">
            <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">
              {elem}
            </h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
