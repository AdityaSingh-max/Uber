import React, { useEffect, useState } from "react";
import socket from "socket.io-client";

import {
  LoadScript,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 25.5941,
  lng: 85.1376,
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      return;
    }

    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const location = {
            lat: latitude,
            lng: longitude,
          };

          console.log("Location updated:", location);

          // Update Google Map
          setCurrentPosition(location);

          // Send location to backend through Socket.IO
          socket.emit("update-location-user", {
            location: {
              latitude,
              longitude,
            },
          });
        },
        (error) => {
          console.log("Location error:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      );
    };

    // Get location immediately
    updateLocation();

    // Update location every 10 seconds
    const intervalId = setInterval(() => {
      updateLocation();
    }, 10000);

  }, []);

  return (
    <div className="h-screen w-full">
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={17}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={currentPosition} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LiveTracking;