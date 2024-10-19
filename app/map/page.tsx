"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import L from "leaflet";

const orangeLeast = new L.Icon({
  iconUrl: "/orange.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const greenUpper = new L.Icon({
  iconUrl: "/green.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const purpleDown = new L.Icon({
  iconUrl: "/purple.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const greyBest = new L.Icon({
  iconUrl: "/grey.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const user = new L.Icon({
  iconUrl: "/full-moon.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

function getRandomCoordinates(
  center: [number, number],
  radius: number
): [number, number] {
  const y0 = center[0];
  const x0 = center[1];
  const rd = radius / 111300; // Convert radius from meters to degrees

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const newLat = y + y0;
  const newLng = x + x0;

  return [newLat, newLng];
}

function getRandomIcon() {
  const icons = [orangeLeast, greenUpper, purpleDown, greyBest];
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
}

function Map() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [randomMarkers, setRandomMarkers] = useState<{ position: [number, number], icon: L.Icon }[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  const FlyToLocation = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.flyTo(position, 13);
      }
    }, [position, map]);
    return null;
  };

  const openModal = (index: number) => {
    setSelectedMarker(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMarker(null);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userPosition: [number, number] = [latitude, longitude];
          setPosition(userPosition);

          const markers = Array.from({ length: 123 }, () => ({
            position: getRandomCoordinates(userPosition, 5000),
            icon: getRandomIcon()
          }));
          setRandomMarkers(markers);
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground dark">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ваше обучение</h1>
      </header>
      <main className="flex-grow z-50">
        <div>
          <MapContainer
            center={[40.609787846393196, 20.7890265133657]}
            zoom={13}
            style={{ height: 800 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {position && (
              <>
                <FlyToLocation position={position} />
                <Marker position={position} icon={user}>
                  <Popup>This is your current location.</Popup>
                </Marker>
                <Circle
                  center={position}
                  radius={500} // Adjust the radius as needed
                  pathOptions={{
                    color: "blue",
                    fillColor: "blue",
                    fillOpacity: 0.2,
                  }}
                />
                {randomMarkers.map((marker, index) => (
                  <Marker key={index} position={marker.position} icon={marker.icon}>
                    <Popup>
                      Random marker {index + 1}
                    </Popup>
                  </Marker>
                ))}
              </>
            )}
          </MapContainer>
        </div>
      </main>
    </div>
  );
}

export default Map;
