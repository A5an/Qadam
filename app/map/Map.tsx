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
import {
  Dialog,
  DialogPortal,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Zap } from "lucide-react"

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
  const icons = [
    { icon: orangeLeast, rarity: "common", prize: 3, imageUrl: "/orange.png" },
    { icon: greenUpper, rarity: "uncommon", prize: 5, imageUrl: "/green.png" },
    { icon: purpleDown, rarity: "rare", prize: 7, imageUrl: "/purple.png" },
    { icon: greyBest, rarity: "legendary", prize: 10, imageUrl: "/grey.png" },
  ];
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
}

function Map() {
  const [energy] = useState(100)
  const [coins] = useState(500)
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [randomMarkers, setRandomMarkers] = useState<{ position: [number, number], icon: L.Icon, rarity: string, prize: number, imageUrl: string }[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [mathTask, setMathTask] = useState<{ question: string, answer: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const generateMathTask = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return {
      question: `${num1} + ${num2}`,
      answer: num1 + num2
    };
  };

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
    setMathTask(generateMathTask());
    setUserAnswer('');
    setIsSuccess(false);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMarker(null);
  };

  const handleSubmit = () => {
    if (mathTask && parseInt(userAnswer) === mathTask.answer) {
      setIsSuccess(true);
      setTimeout(() => {
        setModalIsOpen(false);
        setSelectedMarker(null);
      }, 2000); // Close the modal after 2 seconds
    } else {
      alert("Не правильно! Попробуйте еще раз.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userPosition: [number, number] = [latitude, longitude];
          setPosition(userPosition);

          const markers = Array.from({ length: 67 }, () => ({
            position: getRandomCoordinates(userPosition, 5000),
            ...getRandomIcon()
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
        <h1 className="text-l font-bold">Knowledge Drops</h1>
        <div className="flex space-x-2 items-center">
    <div className=" flex items-center">
      <Button variant="outline" size="default">
      <Image src="/coin.png" alt="Coin" width={24} height={24} className="mr-2" />
        {coins}
      </Button>
    </div>
    <div className=" flex items-center">
    <Button variant="outline" size="default">
      <Zap className="w-4 h-4 mr-2" />
      {energy}
    </Button>
    </div>
  </div>
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
                  <Marker
                    key={index}
                    position={marker.position}
                    icon={marker.icon}
                    eventHandlers={{
                      click: () => openModal(index),
                    }}
                  >
                  </Marker>
                ))}
              </>
            )}
          </MapContainer>
        </div>
      </main>
    <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
      <DialogPortal>
        <div style={{ margin: '0 20px', width: '400px' }}> 
          <DialogContent>
            <DialogTitle>Marker Details</DialogTitle>
            {selectedMarker !== null && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          {mathTask && (
            <>
            <Image style={{marginTop: 10, marginBottom: 10}} src={randomMarkers[selectedMarker].imageUrl} alt="Marker Image" width={200} height={200}  />
            <p style={{fontSize: 24}}>Rarity: {randomMarkers[selectedMarker].rarity}</p>
            <p style={{fontSize: 24}}>Prize: {randomMarkers[selectedMarker].prize} coins</p>
            <p style={{fontSize: 18}}>Solve this task to proceed: {mathTask.question}</p>
              <Input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={isSuccess}
                style={{ width: '100%', padding: '8px', margin: '8px 0' }} // Add consistent styles
              />
              <Button
                onClick={handleSubmit}
                disabled={isSuccess}
                variant="default"
                style={{ width: '100%', marginTop: '8px', borderRadius: '8px' }} // Add consistent styles
              >
                Submit
              </Button>
              {isSuccess && <p style={{ color: 'green' }}>Success!</p>}
            </>
          )}
        </div>
      )}
            <DialogClose asChild>
              <Button style={{ borderRadius: '8px' }} variant="outline" onClick={closeModal}>Close</Button>
            </DialogClose>
          </DialogContent>
        </div>
      </DialogPortal>
    </Dialog>
    </div>
  );
}

export default Map;