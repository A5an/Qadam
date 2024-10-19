"use client";
import * as React from 'react';
import { Button } from "@/components/ui/button" 
import { useEffect, useState } from 'react';
import Map from 'react-map-gl';
import { Zap } from "lucide-react"
import Image from 'next/image';

const token = `${process.env.NEXT_PUBLIC_MAP_BOX}`;

function MapPage() {
  const [energy] = useState(100)
  const [coins] = useState(500)
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
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
      <main className="flex-grow">
      <Map
      mapboxAccessToken={token}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      style={{ height: 800 }}
      attributionControl={false} 
    />
      </main>
    </div>
  );
}

export default MapPage;
