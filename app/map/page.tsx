"use client";
import { useState,useEffect } from 'react';
import * as React from 'react';
import Map from 'react-map-gl';

const token = `${process.env.NEXT_PUBLIC_MAP_BOX}`;

function MapPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground dark">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ваше обучение</h1>
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
